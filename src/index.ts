import 'dotenv/config';

export { WeatherAPI } from './apis/weather';
export type { CurrentWeather, ForecastDay } from './apis/weather';

export { NewsAPI } from './apis/news';
export type { Article, NewsCategory } from './apis/news';

export { FinanceAPI } from './apis/finance';
export type { StockQuote, StockSearchResult, TimeSeriesEntry } from './apis/finance';

export { CryptoAPI } from './apis/crypto';
export type { CoinPrice, CoinDetails } from './apis/crypto';

export { MoviesAPI } from './apis/movies';
export type { Movie, TVShow } from './apis/movies';

export { GamesAPI } from './apis/games';
export type { Game, Pokemon } from './apis/games';

export { FoodAPI } from './apis/food';
export type { Recipe, RecipeSearchResult } from './apis/food';

export { CurrencyAPI } from './apis/currency';
export type { ExchangeRates, ConversionResult } from './apis/currency';

export { GeoAPI } from './apis/geo';
export type { IPLocation, PublicHoliday } from './apis/geo';

export { BooksAPI } from './apis/books';
export type { Book } from './apis/books';

export { UtilitiesAPI } from './apis/utilities';
export type { Joke, RandomQuote, DogFact, CatFact } from './apis/utilities';
