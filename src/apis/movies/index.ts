import { HttpClient } from '../../core/http-client';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  rating: number;
  voteCount: number;
  posterUrl: string | null;
  backdropUrl: string | null;
  genres: string[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  firstAirDate: string;
  rating: number;
  posterUrl: string | null;
}

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface TMDBMovieResponse {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  genres?: Array<{ id: number; name: string }>;
}

interface TMDBListResponse<T> {
  results: T[];
  total_results: number;
  total_pages: number;
}

interface TMDBTVResponse {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string | null;
}

/**
 * TMDB (The Movie Database) — https://www.themoviedb.org/documentation/api
 * Free tier: unlimited requests
 * Get your key at: https://www.themoviedb.org/settings/api
 */
export class MoviesAPI extends HttpClient {
  private genres: Record<number, string> = {};

  constructor(apiKey: string) {
    super({
      baseURL: 'https://api.themoviedb.org/3',
      apiKeyParam: 'api_key',
      apiKey,
    });
  }

  private mapMovie(m: TMDBMovieResponse): Movie {
    return {
      id: m.id,
      title: m.title,
      overview: m.overview,
      releaseDate: m.release_date,
      rating: m.vote_average,
      voteCount: m.vote_count,
      posterUrl: m.poster_path ? `${IMG_BASE}${m.poster_path}` : null,
      backdropUrl: m.backdrop_path ? `${IMG_BASE}${m.backdrop_path}` : null,
      genres: m.genres ? m.genres.map((g) => g.name) : m.genre_ids.map((id) => this.genres[id] ?? 'Unknown'),
    };
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> {
    const data = await this.get<TMDBListResponse<TMDBMovieResponse>>(`/trending/movie/${timeWindow}`);
    return data.results.map((m) => this.mapMovie(m));
  }

  async getPopularMovies(page: number = 1, language: string = 'fr-FR'): Promise<Movie[]> {
    const data = await this.get<TMDBListResponse<TMDBMovieResponse>>('/movie/popular', { page, language });
    return data.results.map((m) => this.mapMovie(m));
  }

  async searchMovies(query: string, language: string = 'fr-FR'): Promise<Movie[]> {
    const data = await this.get<TMDBListResponse<TMDBMovieResponse>>('/search/movie', { query, language });
    return data.results.map((m) => this.mapMovie(m));
  }

  async getMovieDetails(movieId: number, language: string = 'fr-FR'): Promise<Movie> {
    const data = await this.get<TMDBMovieResponse>(`/movie/${movieId}`, { language, append_to_response: 'genres' });
    return this.mapMovie(data);
  }

  async getPopularTVShows(page: number = 1, language: string = 'fr-FR'): Promise<TVShow[]> {
    const data = await this.get<TMDBListResponse<TMDBTVResponse>>('/tv/popular', { page, language });
    return data.results.map((s) => ({
      id: s.id,
      name: s.name,
      overview: s.overview,
      firstAirDate: s.first_air_date,
      rating: s.vote_average,
      posterUrl: s.poster_path ? `${IMG_BASE}${s.poster_path}` : null,
    }));
  }

  async searchTVShows(query: string, language: string = 'fr-FR'): Promise<TVShow[]> {
    const data = await this.get<TMDBListResponse<TMDBTVResponse>>('/search/tv', { query, language });
    return data.results.map((s) => ({
      id: s.id,
      name: s.name,
      overview: s.overview,
      firstAirDate: s.first_air_date,
      rating: s.vote_average,
      posterUrl: s.poster_path ? `${IMG_BASE}${s.poster_path}` : null,
    }));
  }
}
