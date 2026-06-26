import { HttpClient } from '../../core/http-client';

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  high24h: number;
  low24h: number;
  lastUpdated: string;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  description: string;
  homepage: string;
  marketCapRank: number;
  currentPrice: number;
  allTimeHigh: number;
  allTimeLow: number;
  circulatingSupply: number;
  totalSupply: number | null;
}

interface CGCoinMarketResponse {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  last_updated: string;
}

interface CGCoinDetailResponse {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  links: { homepage: string[] };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    ath: { usd: number };
    atl: { usd: number };
    circulating_supply: number;
    total_supply: number | null;
  };
}

/**
 * CoinGecko API — https://www.coingecko.com/en/api
 * Free tier: 30 calls/min, no key required
 * Demo key available at: https://www.coingecko.com/en/api/pricing
 */
export class CryptoAPI extends HttpClient {
  constructor(apiKey?: string) {
    super({
      baseURL: 'https://api.coingecko.com/api/v3',
      ...(apiKey ? { apiKeyHeader: 'x-cg-demo-api-key', apiKey } : {}),
    });
  }

  async getTopCoins(options: {
    currency?: string;
    count?: number;
    order?: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc';
  } = {}): Promise<CoinPrice[]> {
    const data = await this.get<CGCoinMarketResponse[]>('/coins/markets', {
      vs_currency: options.currency ?? 'usd',
      order: options.order ?? 'market_cap_desc',
      per_page: options.count ?? 10,
      page: 1,
      sparkline: false,
    });
    return data.map((c) => ({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      currentPrice: c.current_price,
      marketCap: c.market_cap,
      volume24h: c.total_volume,
      priceChange24h: c.price_change_24h,
      priceChangePercent24h: c.price_change_percentage_24h,
      high24h: c.high_24h,
      low24h: c.low_24h,
      lastUpdated: c.last_updated,
    }));
  }

  async getCoinDetails(coinId: string): Promise<CoinDetails> {
    const data = await this.get<CGCoinDetailResponse>(`/coins/${coinId}`, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
    });
    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      description: data.description.en.replace(/<[^>]*>/g, '').split('\r\n')[0],
      homepage: data.links.homepage[0],
      marketCapRank: data.market_cap_rank,
      currentPrice: data.market_data.current_price.usd,
      allTimeHigh: data.market_data.ath.usd,
      allTimeLow: data.market_data.atl.usd,
      circulatingSupply: data.market_data.circulating_supply,
      totalSupply: data.market_data.total_supply,
    };
  }

  async getCoinPriceHistory(coinId: string, days: number = 7, currency: string = 'usd'): Promise<Array<{ date: string; price: number }>> {
    const data = await this.get<{ prices: Array<[number, number]> }>(`/coins/${coinId}/market_chart`, {
      vs_currency: currency,
      days,
      interval: days <= 1 ? 'hourly' : 'daily',
    });
    return data.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp).toISOString(),
      price,
    }));
  }

  async searchCoins(query: string): Promise<Array<{ id: string; name: string; symbol: string }>> {
    const data = await this.get<{ coins: Array<{ id: string; name: string; symbol: string }> }>('/search', { query });
    return data.coins.slice(0, 10);
  }
}
