import { Readability } from '@mozilla/readability';

import { cleanTitle } from '~/utils/htmlUtils';
import { parseHTML } from 'linkedom';

type ArticleResponse = {
  title: string;
  content: string;
  url: string;
  image: string;
};

interface ExtendedReadability extends Readability {
  _topCandidate?: Element;
}

export async function parseArticle(url: string): Promise<ArticleResponse> {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    // Fetch the article content through the background service worker
    const html = await fetch(url);
    const htmlText = await html.text();

    // Remove style tags to prevent CSS parsing errors
    const cleanedHtml = htmlText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    // Create a temporary DOM element to parse the HTML
    const { document: doc } = parseHTML(cleanedHtml);

    // Validate that we have a valid document
    if (!doc || typeof doc.querySelector !== 'function') {
      throw new Error('Failed to parse HTML document');
    }

    // Try to get the title from meta tags first
    let title = '';
    const metaTitle =
      doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
      doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
      doc.querySelector('title')?.textContent;

    if (metaTitle) {
      title = cleanTitle(metaTitle);
    }

    const reader = new Readability(doc, {
      charThreshold: 20,
      classesToPreserve: ['article-image', 'article-content'],
      keepClasses: false,
    }) as ExtendedReadability;

    const article = reader.parse();

    if (!article) {
      throw new Error('Could not parse article content');
    }

    // If we don't have a title from meta tags, use the one from Readability
    if (!title) {
      title = cleanTitle(article.title || '');
    }

    // Try to find the main image
    let mainImage = '';

    // First try meta tags
    const metaImage =
      doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
      doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');

    if (metaImage) {
      mainImage = metaImage;
    } else if (reader._topCandidate) {
      // Then try the top candidate element
      const images = reader._topCandidate.getElementsByTagName('img');
      if (images.length > 0) {
        const src = images[0].getAttribute('src');
        if (src) {
          mainImage = src;
        }
      }
    }

    const { document: contentDoc } = parseHTML(article.content || '');

    // Check if we have valid content
    if (!contentDoc || !contentDoc.body) {
      console.error('Invalid content document structure');
      throw new Error('Invalid content document structure');
    }

    // Get the main content wrapper
    const mainContent = contentDoc.querySelector('.page') || contentDoc.body;
    if (!mainContent) {
      console.error('No main content wrapper found');
      throw new Error('No main content wrapper found');
    }

    // Process images more carefully
    const images = Array.from(mainContent.getElementsByTagName('img'));

    // Process standalone images
    for (const img of images) {
      // Skip images that are already processed within picture elements
      if (img.closest('picture')) continue;

      const src = img.getAttribute('src');
      const dataSrc = img.getAttribute('data-src');
      const srcset = img.getAttribute('srcset');

      // Handle malformed src attributes that contain JSON arrays
      let processedSrc = src;
      if (src && src.startsWith('[') && src.endsWith(']')) {
        try {
          const srcArray = JSON.parse(src);
          if (Array.isArray(srcArray) && srcArray.length > 0) {
            processedSrc = srcArray[0];
          }
        } catch (e) {
          console.warn('Failed to parse image src JSON:', e);
        }
      }

      if (processedSrc) {
        img.setAttribute('src', processedSrc);
      }
      if (dataSrc) {
        img.setAttribute('data-src', dataSrc);
      }
      if (srcset) {
        const newSrcset = srcset
          .split(',')
          .map((src) => {
            const [url, size] = src.trim().split(' ');
            return `${url} ${size}`;
          })
          .join(', ');
        img.setAttribute('srcset', newSrcset);
      }

      if (!src && !dataSrc && !srcset) {
        img.remove();
      }
    }

    // Process figures more carefully
    const figures = Array.from(mainContent.getElementsByTagName('figure'));

    for (const figure of figures) {
      const hasImages = figure.getElementsByTagName('img').length > 0;
      if (!hasImages) {
        figure.remove();
      }
    }

    // Clean up the content
    let processedContent = mainContent.innerHTML
      .replace(/<head>.*?<\/head>/g, '') // Remove head tags
      .replace(/<body>.*?<\/body>/g, '') // Remove body tags
      .replace(/<svg[\s\S]*?<\/svg>/g, '') // Remove SVG elements
      .trim();

    // Check if we have content after processing
    if (!processedContent || processedContent.trim().length === 0) {
      console.error('No content found after processing');
      throw new Error('No content found in the article');
    }

    return {
      title: title,
      content: processedContent,
      url: url,
      image: mainImage,
    };
  } catch (error) {
    console.error('Error parsing article:', error);
    throw error;
  }
}
