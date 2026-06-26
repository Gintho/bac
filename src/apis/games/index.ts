import { HttpClient } from '../../core/http-client';

export interface Game {
  id: number;
  name: string;
  rating: number;
  released: string;
  backgroundImage: string | null;
  genres: string[];
  platforms: string[];
  description?: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  stats: Record<string, number>;
  spriteUrl: string | null;
}

interface RAWGListResponse {
  results: Array<{
    id: number;
    name: string;
    rating: number;
    released: string;
    background_image: string | null;
    genres: Array<{ name: string }>;
    platforms: Array<{ platform: { name: string } }>;
  }>;
}

interface PokeAPIResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: { front_default: string | null };
}

/**
 * RAWG Video Games Database — https://rawg.io/apidocs
 * Free tier: 20,000 requests/month
 * Get your key at: https://rawg.io/apidocs
 */
export class GamesAPI extends HttpClient {
  private readonly pokeClient: HttpClient;

  constructor(rawgApiKey: string) {
    super({
      baseURL: 'https://api.rawg.io/api',
      apiKeyParam: 'key',
      apiKey: rawgApiKey,
    });
    // PokéAPI is completely free, no key needed
    this.pokeClient = new (class extends HttpClient {
      async fetchGet<T>(path: string) { return this.get<T>(path); }
    })({ baseURL: 'https://pokeapi.co/api/v2' });
  }

  async getPopularGames(options: {
    page?: number;
    pageSize?: number;
    ordering?: string;
  } = {}): Promise<Game[]> {
    const data = await this.get<RAWGListResponse>('/games', {
      page: options.page ?? 1,
      page_size: options.pageSize ?? 10,
      ordering: options.ordering ?? '-rating',
    });
    return data.results.map((g) => ({
      id: g.id,
      name: g.name,
      rating: g.rating,
      released: g.released,
      backgroundImage: g.background_image,
      genres: g.genres.map((genre) => genre.name),
      platforms: g.platforms.map((p) => p.platform.name),
    }));
  }

  async searchGames(query: string): Promise<Game[]> {
    const data = await this.get<RAWGListResponse>('/games', { search: query, page_size: 10 });
    return data.results.map((g) => ({
      id: g.id,
      name: g.name,
      rating: g.rating,
      released: g.released,
      backgroundImage: g.background_image,
      genres: g.genres.map((genre) => genre.name),
      platforms: g.platforms.map((p) => p.platform.name),
    }));
  }

  /**
   * PokéAPI — https://pokeapi.co (completely free, no key needed)
   */
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const res = await this.client.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = res.data;
    return {
      id: data.id,
      name: data.name,
      height: data.height / 10,
      weight: data.weight / 10,
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name),
      stats: Object.fromEntries(data.stats.map((s) => [s.stat.name, s.base_stat])),
      spriteUrl: data.sprites.front_default,
    };
  }

  async listPokemon(limit: number = 20, offset: number = 0): Promise<Array<{ name: string; url: string }>> {
    const res = await this.client.get<{ results: Array<{ name: string; url: string }> }>(
      'https://pokeapi.co/api/v2/pokemon',
      { params: { limit, offset } }
    );
    return res.data.results;
  }
}
