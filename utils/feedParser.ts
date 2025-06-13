import type { Post } from '../types/feed';

const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

interface XMLElement {
  tagName: string;
  textContent: string | null;
  getAttribute(name: string): string | null;
  getElementsByTagName(name: string): { [index: number]: XMLElement; length: number };
  getElementsByTagNameNS(
    namespace: string,
    name: string
  ): { [index: number]: XMLElement; length: number };
}

interface XMLDocument {
  documentElement: XMLElement;
}

export default function parseFeed(xmlDoc: XMLDocument): Post[] {
  const isAtom = xmlDoc.documentElement.tagName === 'feed';
  const isRss = xmlDoc.documentElement.tagName === 'rss';

  if (!isAtom && !isRss) {
    console.error('Unsupported feed format');
    return [];
  }

  let title = '';
  let logoUrl = '';
  let sourceName = '';
  let sourceUrl = '';
  let entries: XMLElement[] = [];

  if (isAtom) {
    const feed = xmlDoc.documentElement;
    if (!feed) return [];

    title =
      feed.getElementsByTagName('title')[0]?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') || '';
    title = stripHtml(title);
    logoUrl = feed.getElementsByTagName('logo')[0]?.textContent || '';
    sourceName =
      feed
        .getElementsByTagName('author')[0]
        ?.getElementsByTagName('name')[0]
        ?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') || '';
    sourceName = stripHtml(sourceName);
    sourceUrl =
      feed.getElementsByTagName('author')[0]?.getElementsByTagName('uri')[0]?.textContent || '';
    entries = Array.from(feed.getElementsByTagName('entry'));
  } else {
    const channel = xmlDoc.documentElement.getElementsByTagName('channel')[0];
    if (!channel) return [];

    title =
      channel.getElementsByTagName('title')[0]?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') ||
      '';
    title = stripHtml(title);
    logoUrl =
      channel.getElementsByTagName('image')[0]?.getElementsByTagName('url')[0]?.textContent || '';
    sourceName = title;
    sourceUrl = channel.getElementsByTagName('link')[0]?.textContent || '';
    entries = Array.from(channel.getElementsByTagName('item'));
  }

  return entries.map((entry) => {
    const id =
      entry.getElementsByTagName('guid')[0]?.textContent ||
      entry.getElementsByTagName('id')[0]?.textContent ||
      entry.getElementsByTagName('link')[0]?.textContent ||
      '';

    if (!id) {
      console.error('No ID found for post');
    }

    let image = '';
    if (isAtom) {
      const links = entry.getElementsByTagName('link');
      const enclosure = Array.from(links).find(
        (link: XMLElement) => link.getAttribute('rel') === 'enclosure'
      );
      const mediaContent = Array.from(entry.getElementsByTagName('media:content')).find(
        (content: XMLElement) => content.getAttribute('type')?.startsWith('image/')
      );
      image = enclosure?.getAttribute('href') || mediaContent?.getAttribute('url') || '';
    } else {
      const mediaContent = entry.getElementsByTagNameNS(
        'http://search.yahoo.com/mrss/',
        'content'
      )[0];

      const mediaType = mediaContent?.getAttribute('type');
      const isVideo = mediaType === 'video/mp4';

      image =
        (isVideo
          ? entry
              .getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'thumbnail')[0]
              ?.getAttribute('url')
          : mediaContent?.getAttribute('url')) ||
        entry.getElementsByTagName('enclosure')[0]?.getAttribute('url') ||
        entry.getElementsByTagName('image')[0]?.getAttribute('url') ||
        '';
    }

    let author = isAtom
      ? entry
          .getElementsByTagName('author')[0]
          ?.getElementsByTagName('name')[0]
          ?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') || ''
      : entry.getElementsByTagName('author')[0]?.textContent || '';
    author = stripHtml(author);

    const content = isAtom
      ? entry.getElementsByTagName('content')[0]?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') ||
        ''
      : '';
    let description = isAtom
      ? entry.getElementsByTagName('summary')[0]?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') ||
        content
      : entry
          .getElementsByTagName('description')[0]
          ?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') || '';
    description = stripHtml(description);

    const link = isAtom
      ? Array.from(entry.getElementsByTagName('link'))
          .find((link: XMLElement) => link.getAttribute('rel') === 'alternate')
          ?.getAttribute('href') || ''
      : entry.getElementsByTagName('link')[0]?.textContent || '';

    const date = isAtom
      ? entry.getElementsByTagName('published')[0]?.textContent ||
        entry.getElementsByTagName('updated')[0]?.textContent ||
        ''
      : entry.getElementsByTagName('pubDate')[0]?.textContent || '';

    const tags = isAtom
      ? []
      : Array.from(entry.getElementsByTagName('category'))
          .map((cat: XMLElement) => cat.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') || '')
          .filter(Boolean);

    return {
      id,
      title: stripHtml(
        entry.getElementsByTagName('title')[0]?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '') || ''
      ),
      description,
      image,
      link,
      date,
      author,
      tags: tags.map((tag) => stripHtml(tag)),
      source: {
        title,
        logoUrl,
        sourceName,
        sourceUrl,
      },
    };
  });
}
