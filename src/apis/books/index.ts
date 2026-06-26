import { HttpClient } from '../../core/http-client';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string | null;
  publishedDate: string | null;
  pageCount: number | null;
  categories: string[];
  thumbnail: string | null;
  previewLink: string;
  language: string;
}

interface GoogleBooksResponse {
  items: Array<{
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      publishedDate?: string;
      pageCount?: number;
      categories?: string[];
      imageLinks?: { thumbnail?: string };
      previewLink: string;
      language: string;
    };
  }>;
}

/**
 * Google Books API — https://developers.google.com/books
 * Free tier: 1,000 requests/day (without key), more with key
 * Get your key at: https://console.cloud.google.com/apis/library/books.googleapis.com
 *
 * Open Library is also available — completely free, no key needed
 */
export class BooksAPI extends HttpClient {
  constructor(apiKey?: string) {
    super({
      baseURL: 'https://www.googleapis.com/books/v1',
      ...(apiKey ? { apiKeyParam: 'key', apiKey } : {}),
    });
  }

  async searchBooks(options: {
    query: string;
    maxResults?: number;
    language?: string;
    filter?: 'free-ebooks' | 'paid-ebooks' | 'ebooks' | 'full';
    orderBy?: 'relevance' | 'newest';
  }): Promise<Book[]> {
    const data = await this.get<GoogleBooksResponse>('/volumes', {
      q: options.query,
      maxResults: options.maxResults ?? 10,
      langRestrict: options.language,
      filter: options.filter,
      orderBy: options.orderBy ?? 'relevance',
    });

    if (!data.items) return [];

    return data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors ?? [],
      description: item.volumeInfo.description ?? null,
      publishedDate: item.volumeInfo.publishedDate ?? null,
      pageCount: item.volumeInfo.pageCount ?? null,
      categories: item.volumeInfo.categories ?? [],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? null,
      previewLink: item.volumeInfo.previewLink,
      language: item.volumeInfo.language,
    }));
  }

  async searchByISBN(isbn: string): Promise<Book | null> {
    const data = await this.get<GoogleBooksResponse>('/volumes', { q: `isbn:${isbn}` });
    if (!data.items?.length) return null;
    const item = data.items[0];
    return {
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors ?? [],
      description: item.volumeInfo.description ?? null,
      publishedDate: item.volumeInfo.publishedDate ?? null,
      pageCount: item.volumeInfo.pageCount ?? null,
      categories: item.volumeInfo.categories ?? [],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? null,
      previewLink: item.volumeInfo.previewLink,
      language: item.volumeInfo.language,
    };
  }
}
