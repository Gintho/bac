import { HttpClient } from '../../core/http-client';

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  date: string;
}

interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

/**
 * ExchangeRate-API — https://www.exchangerate-api.com
 * Free tier: 1,500 requests/month
 * Get your key at: https://www.exchangerate-api.com/
 *
 * Alternative (no key needed): frankfurter.app
 */
export class CurrencyAPI extends HttpClient {
  constructor(apiKey?: string) {
    if (apiKey) {
      super({ baseURL: `https://v6.exchangerate-api.com/v6/${apiKey}` });
    } else {
      // Frankfurter is completely free, no key needed
      super({ baseURL: 'https://api.frankfurter.app' });
    }
  }

  async getLatestRates(baseCurrency: string = 'EUR'): Promise<ExchangeRates> {
    const data = await this.get<ExchangeRateResponse>('/latest', { base: baseCurrency });
    return {
      base: data.base ?? baseCurrency,
      date: data.date,
      rates: data.rates,
    };
  }

  async convert(options: {
    from: string;
    to: string;
    amount: number;
  }): Promise<ConversionResult> {
    const data = await this.get<ExchangeRateResponse>('/latest', {
      base: options.from,
      symbols: options.to,
    });
    const rate = data.rates[options.to];
    return {
      from: options.from,
      to: options.to,
      amount: options.amount,
      result: options.amount * rate,
      rate,
      date: data.date,
    };
  }

  async getHistoricalRates(date: string, baseCurrency: string = 'EUR'): Promise<ExchangeRates> {
    const data = await this.get<ExchangeRateResponse>(`/${date}`, { base: baseCurrency });
    return {
      base: data.base ?? baseCurrency,
      date: data.date,
      rates: data.rates,
    };
  }

  async getSupportedCurrencies(): Promise<Record<string, string>> {
    const data = await this.get<Record<string, string>>('/currencies');
    return data;
  }
}
