import { HttpClient } from '../../core/http-client';

export interface Article {
  title: string;
  description: string | null;
  url: string;
  source: string;
  publishedAt: string;
  author: string | null;
  imageUrl: string | null;
}

export type NewsCategory = 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';

interface NewsAPIResponse {
  articles: Array<{
    title: string;
    description: string | null;
    url: string;
    source: { name: string };
    publishedAt: string;
    author: string | null;
    urlToImage: string | null;
  }>;
}

/**
 * NewsAPI — https://newsapi.org
 * Free tier: 100 requests/day (developer plan)
 * Get your key at: https://newsapi.org/register
 */
export class NewsAPI extends HttpClient {
  constructor(apiKey: string) {
    super({
      baseURL: 'https://newsapi.org/v2',
      apiKeyHeader: 'X-Api-Key',
      apiKey,
    });
  }

  private mapArticles(data: NewsAPIResponse): Article[] {
    return data.articles.map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      source: a.source.name,
      publishedAt: a.publishedAt,
      author: a.author,
      imageUrl: a.urlToImage,
    }));
  }

  async getTopHeadlines(options: {
    country?: string;
    category?: NewsCategory;
    query?: string;
    pageSize?: number;
  } = {}): Promise<Article[]> {
    const data = await this.get<NewsAPIResponse>('/top-headlines', {
      country: options.country ?? 'fr',
      category: options.category,
      q: options.query,
      pageSize: options.pageSize ?? 10,
    });
    return this.mapArticles(data);
  }

  async searchEverything(options: {
    query: string;
    language?: string;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
    pageSize?: number;
    from?: string;
  }): Promise<Article[]> {
    const data = await this.get<NewsAPIResponse>('/everything', {
      q: options.query,
      language: options.language ?? 'fr',
      sortBy: options.sortBy ?? 'publishedAt',
      pageSize: options.pageSize ?? 10,
      from: options.from,
    });
    return this.mapArticles(data);
  }
}
