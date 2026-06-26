/**
 * Demo — shows how to use each API integration.
 * Copy .env.example to .env and fill in your keys before running:
 *   npx ts-node src/examples/demo.ts
 */
import 'dotenv/config';
import {
  WeatherAPI,
  NewsAPI,
  FinanceAPI,
  CryptoAPI,
  MoviesAPI,
  GamesAPI,
  FoodAPI,
  CurrencyAPI,
  GeoAPI,
  BooksAPI,
  UtilitiesAPI,
} from '../index';

async function main() {
  // ── Weather ──────────────────────────────────────────────────────────────
  if (process.env.OPENWEATHER_API_KEY) {
    const weather = new WeatherAPI(process.env.OPENWEATHER_API_KEY);
    const current = await weather.getCurrentWeather('Paris');
    console.log('\n🌤 Weather in Paris:', current);
  }

  // ── News ─────────────────────────────────────────────────────────────────
  if (process.env.NEWSAPI_KEY) {
    const news = new NewsAPI(process.env.NEWSAPI_KEY);
    const headlines = await news.getTopHeadlines({ country: 'fr', category: 'technology', pageSize: 3 });
    console.log('\n📰 Top Tech News FR:', headlines.map((a) => a.title));
  }

  // ── Finance ───────────────────────────────────────────────────────────────
  if (process.env.ALPHA_VANTAGE_API_KEY) {
    const finance = new FinanceAPI(process.env.ALPHA_VANTAGE_API_KEY);
    const quote = await finance.getQuote('AAPL');
    console.log('\n📈 AAPL Quote:', quote);
  }

  // ── Crypto (no key needed) ────────────────────────────────────────────────
  const crypto = new CryptoAPI(process.env.COINGECKO_API_KEY);
  const topCoins = await crypto.getTopCoins({ count: 5 });
  console.log('\n₿ Top 5 Cryptos:', topCoins.map((c) => `${c.name}: $${c.currentPrice}`));

  // ── Movies ────────────────────────────────────────────────────────────────
  if (process.env.TMDB_API_KEY) {
    const movies = new MoviesAPI(process.env.TMDB_API_KEY);
    const trending = await movies.getTrendingMovies();
    console.log('\n🎬 Trending Movies:', trending.slice(0, 3).map((m) => m.title));
  }

  // ── Games & Pokémon (Pokémon free, no key) ────────────────────────────────
  if (process.env.RAWG_API_KEY) {
    const games = new GamesAPI(process.env.RAWG_API_KEY);
    const pikachu = await games.getPokemon('pikachu');
    console.log('\n🎮 Pikachu:', { types: pikachu.types, stats: pikachu.stats });
  }

  // ── Currency (free tier via Frankfurter, no key needed) ───────────────────
  const currency = new CurrencyAPI();
  const conversion = await currency.convert({ from: 'EUR', to: 'USD', amount: 100 });
  console.log('\n💶 100 EUR =', conversion.result.toFixed(2), 'USD');

  // ── Geo (free, no key needed) ─────────────────────────────────────────────
  const geo = new GeoAPI();
  const holidays = await geo.getNextPublicHolidays('FR');
  console.log('\n📅 Next French holidays:', holidays.slice(0, 3).map((h) => `${h.date}: ${h.name}`));

  // ── Books (works without key, limited) ───────────────────────────────────
  const books = new BooksAPI(process.env.GOOGLE_BOOKS_API_KEY);
  const results = await books.searchBooks({ query: 'clean code', maxResults: 3 });
  console.log('\n📚 Books:', results.map((b) => b.title));

  // ── Utilities (all free, no key) ─────────────────────────────────────────
  const utils = new UtilitiesAPI();
  const joke = await utils.getRandomJoke('Programming');
  console.log('\n😄 Joke:', joke.setup, '|', joke.punchline);
  const quote = await utils.getRandomQuote();
  console.log('\n💬 Quote:', `"${quote.content}" — ${quote.author}`);
}

main().catch(console.error);
