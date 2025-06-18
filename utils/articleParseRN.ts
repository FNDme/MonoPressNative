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

/**
 * Fetches and cleans HTML content from a URL
 */
async function fetchAndCleanHTML(url: string): Promise<string> {
  const decoder = new TextDecoder('utf-8');
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
  });

  const htmlText = decoder.decode(await response.arrayBuffer());
  // Remove style tags to prevent CSS parsing errors
  return htmlText.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
}

/**
 * Extracts title from meta tags or document title
 */
function extractTitle(doc: Document): string {
  const metaTitle =
    doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
    doc.querySelector('title')?.textContent;

  return metaTitle ? cleanTitle(metaTitle) : '';
}

/**
 * Extracts main image from meta tags or article content
 */
function extractMainImage(doc: Document, reader: ExtendedReadability): string {
  // First try meta tags
  const metaImage =
    doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
    doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');

  if (metaImage) {
    return metaImage;
  }

  // Then try the top candidate element
  if (reader._topCandidate) {
    const images = reader._topCandidate.getElementsByTagName('img');
    if (images.length > 0) {
      const src = images[0].getAttribute('src');
      if (src) {
        return src;
      }
    }
  }

  return '';
}

/**
 * Processes image source attributes, handling malformed JSON arrays
 */
function processImageSrc(src: string | null): string | null {
  if (!src) return null;

  // Handle malformed src attributes that contain JSON arrays
  if (src.startsWith('[') && src.endsWith(']')) {
    try {
      const srcArray = JSON.parse(src);
      if (Array.isArray(srcArray) && srcArray.length > 0) {
        return srcArray[0];
      }
    } catch (e) {
      console.warn('Failed to parse image src JSON:', e);
    }
  }

  return src;
}

/**
 * Processes srcset attribute to ensure proper formatting
 */
function processSrcset(srcset: string): string {
  return srcset
    .split(',')
    .map((src) => {
      const [url, size] = src.trim().split(' ');
      return `${url} ${size}`;
    })
    .join(', ');
}

/**
 * Processes images in the content, cleaning up attributes and removing invalid ones
 */
function processImages(mainContent: Element, mainImage: string): void {
  const images = Array.from(mainContent.getElementsByTagName('img'));

  for (const img of images) {
    // Skip images that are already processed within picture elements
    if (img.closest('picture')) continue;

    const src = img.getAttribute('src');
    const dataSrc = img.getAttribute('data-src');
    const srcset = img.getAttribute('srcset');

    if (src?.includes(mainImage) || dataSrc?.includes(mainImage) || srcset?.includes(mainImage)) {
      img.remove();
      continue;
    }

    const processedSrc = processImageSrc(src);
    if (processedSrc) {
      img.setAttribute('src', processedSrc);
    }

    if (dataSrc) {
      img.setAttribute('data-src', dataSrc);
    }

    if (srcset) {
      img.setAttribute('srcset', processSrcset(srcset));
    }

    // Remove images without any valid source
    if (!processedSrc && !dataSrc && !srcset) {
      img.remove();
    }
  }
}

/**
 * Removes figures that don't contain images
 */
function cleanupFigures(mainContent: Element): void {
  const figures = Array.from(mainContent.getElementsByTagName('figure'));

  for (const figure of figures) {
    const hasImages = figure.getElementsByTagName('img').length > 0;
    if (!hasImages) {
      figure.remove();
    }
  }
}

/**
 * Cleans up the final HTML content by removing unnecessary tags
 */
function cleanupContent(html: string): string {
  return html
    .replace(/<head>.*?<\/head>/g, '') // Remove head tags
    .replace(/<body>.*?<\/body>/g, '') // Remove body tags
    .replace(/<svg[\s\S]*?<\/svg>/g, '') // Remove SVG elements
    .trim();
}

/**
 * Validates that the parsed content is valid and not empty
 */
function validateContent(content: string): void {
  if (!content || content.trim().length === 0) {
    throw new Error('No content found in the article');
  }
}

/**
 * Main function to parse an article from a URL
 */
export async function parseArticle(url: string): Promise<ArticleResponse> {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    // Fetch and clean HTML
    const cleanedHtml = await fetchAndCleanHTML(url);

    // Parse HTML into document
    const { document: doc } = parseHTML(cleanedHtml);

    // Validate document
    if (!doc || typeof doc.querySelector !== 'function') {
      throw new Error('Failed to parse HTML document');
    }

    // Extract title from meta tags
    let title = extractTitle(doc);

    // Parse article content using Readability
    const reader = new Readability(doc, {
      charThreshold: 20,
      classesToPreserve: ['article-image', 'article-content'],
      keepClasses: false,
    }) as ExtendedReadability;

    const article = reader.parse();

    if (!article) {
      throw new Error('Could not parse article content');
    }

    // Use Readability title if we don't have one from meta tags
    if (!title) {
      title = cleanTitle(article.title || '');
    }

    // Extract main image
    const mainImage = extractMainImage(doc, reader);

    // Parse article content
    const { document: contentDoc } = parseHTML(article.content || '');

    // Validate content document
    if (!contentDoc || !contentDoc.body) {
      throw new Error('Invalid content document structure');
    }

    // Get main content wrapper
    const mainContent = contentDoc.querySelector('.page') || contentDoc.body;
    if (!mainContent) {
      throw new Error('No main content wrapper found');
    }

    // Process images and figures
    processImages(mainContent, mainImage);
    cleanupFigures(mainContent);

    // Clean up final content
    const processedContent = cleanupContent(mainContent.innerHTML);

    // Validate final content
    validateContent(processedContent);

    return {
      title,
      content: processedContent,
      url,
      image: mainImage,
    };
  } catch (error) {
    console.error('Error parsing article:', error);
    throw error;
  }
}
