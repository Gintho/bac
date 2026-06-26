import { HttpClient } from '../../core/http-client';

export interface Joke {
  setup: string;
  punchline: string;
  category: string;
}

export interface RandomFact {
  text: string;
  source: string;
}

export interface DogFact {
  fact: string;
  length: number;
}

export interface CatFact {
  fact: string;
  length: number;
}

export interface RandomQuote {
  content: string;
  author: string;
  tags: string[];
}

/**
 * Collection of free utility APIs requiring no API key:
 * - JokeAPI (https://jokeapi.dev)
 * - Dog Facts API (https://kinduff.github.io/dog-api)
 * - Cat Facts API (https://catfact.ninja)
 * - Quotable (https://quotable.io)
 */
export class UtilitiesAPI {
  private readonly jokeClient: HttpClient;
  private readonly dogClient: HttpClient;
  private readonly catClient: HttpClient;
  private readonly quoteClient: HttpClient;

  constructor() {
    this.jokeClient = new (class extends HttpClient {
      async get<T>(path: string, params?: Record<string, unknown>) { return super.get<T>(path, params); }
    })({ baseURL: 'https://v2.jokeapi.dev' });

    this.dogClient = new (class extends HttpClient {
      async get<T>(path: string) { return super.get<T>(path); }
    })({ baseURL: 'https://dog-api.kinduff.com/api' });

    this.catClient = new (class extends HttpClient {
      async get<T>(path: string) { return super.get<T>(path); }
    })({ baseURL: 'https://catfact.ninja' });

    this.quoteClient = new (class extends HttpClient {
      async get<T>(path: string, params?: Record<string, unknown>) { return super.get<T>(path, params); }
    })({ baseURL: 'https://api.quotable.io' });
  }

  async getRandomJoke(category: 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas' = 'Programming'): Promise<Joke> {
    const res = await this.jokeClient['client'].get<{
      type: string;
      joke?: string;
      setup?: string;
      delivery?: string;
      category: string;
    }>(`/joke/${category}`, { params: { type: 'twopart,single', safe: true } });
    const data = res.data;
    if (data.type === 'single') {
      return { setup: data.joke!, punchline: '', category: data.category };
    }
    return { setup: data.setup!, punchline: data.delivery!, category: data.category };
  }

  async getDogFact(): Promise<DogFact> {
    const res = await this.dogClient['client'].get<{ facts: string[]; success: boolean }>('/facts');
    return { fact: res.data.facts[0], length: res.data.facts[0].length };
  }

  async getCatFact(): Promise<CatFact> {
    const res = await this.catClient['client'].get<CatFact>('/fact');
    return res.data;
  }

  async getRandomQuote(options: { tags?: string; author?: string } = {}): Promise<RandomQuote> {
    const res = await this.quoteClient['client'].get<{
      content: string;
      author: string;
      tags: string[];
    }>('/random', { params: options });
    return {
      content: res.data.content,
      author: res.data.author,
      tags: res.data.tags,
    };
  }
}
