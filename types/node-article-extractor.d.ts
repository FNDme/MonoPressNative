declare module 'node-article-extractor' {
  interface Article {
    title: string;
    text: string;
    content: string;
    image: string;
    author: string;
    date: string;
    url: string;
  }

  export function extract(html: string, url: string): Promise<Article>;
}
