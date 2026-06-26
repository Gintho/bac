import { HttpClient } from '../../core/http-client';

export interface StockQuote {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  previousClose: number;
  change: number;
  changePercent: string;
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

export interface TimeSeriesEntry {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface AVQuoteResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

interface AVSearchResponse {
  bestMatches: Array<{
    '1. symbol': string;
    '2. name': string;
    '3. type': string;
    '4. region': string;
    '8. currency': string;
  }>;
}

interface AVTimeSeriesResponse {
  'Time Series (Daily)': Record<string, {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  }>;
}

/**
 * Alpha Vantage — https://www.alphavantage.co
 * Free tier: 25 requests/day
 * Get your key at: https://www.alphavantage.co/support/#api-key
 */
export class FinanceAPI extends HttpClient {
  constructor(apiKey: string) {
    super({
      baseURL: 'https://www.alphavantage.co',
      apiKeyParam: 'apikey',
      apiKey,
    });
  }

  async getQuote(symbol: string): Promise<StockQuote> {
    const data = await this.get<AVQuoteResponse>('/query', { function: 'GLOBAL_QUOTE', symbol });
    const q = data['Global Quote'];
    return {
      symbol: q['01. symbol'],
      open: parseFloat(q['02. open']),
      high: parseFloat(q['03. high']),
      low: parseFloat(q['04. low']),
      price: parseFloat(q['05. price']),
      volume: parseInt(q['06. volume']),
      previousClose: parseFloat(q['08. previous close']),
      change: parseFloat(q['09. change']),
      changePercent: q['10. change percent'],
    };
  }

  async searchSymbol(keywords: string): Promise<StockSearchResult[]> {
    const data = await this.get<AVSearchResponse>('/query', { function: 'SYMBOL_SEARCH', keywords });
    return data.bestMatches.map((m) => ({
      symbol: m['1. symbol'],
      name: m['2. name'],
      type: m['3. type'],
      region: m['4. region'],
      currency: m['8. currency'],
    }));
  }

  async getDailyTimeSeries(symbol: string, outputSize: 'compact' | 'full' = 'compact'): Promise<TimeSeriesEntry[]> {
    const data = await this.get<AVTimeSeriesResponse>('/query', {
      function: 'TIME_SERIES_DAILY',
      symbol,
      outputsize: outputSize,
    });
    return Object.entries(data['Time Series (Daily)']).map(([date, values]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume']),
    }));
  }
}
