import { HttpClient } from '../../core/http-client';

export interface IPLocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string;
}

export interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  types: string[];
}

interface IPAPIResponse {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
  org: string;
}

interface NagerHolidayResponse {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  types: string[];
}

/**
 * ipapi.co — https://ipapi.co (free, no key for 1000 req/day)
 * Nager.Date — https://date.nager.at (completely free, no key needed)
 */
export class GeoAPI {
  private readonly ipClient: HttpClient;
  private readonly holidayClient: HttpClient;

  constructor() {
    this.ipClient = new (class extends HttpClient {
      async fetchGet<T>(path: string) { return this.get<T>(path); }
    })({ baseURL: 'https://ipapi.co' });

    this.holidayClient = new (class extends HttpClient {
      async fetchGet<T>(path: string) { return this.get<T>(path); }
    })({ baseURL: 'https://date.nager.at/api/v3' });
  }

  async getIPLocation(ip?: string): Promise<IPLocation> {
    const endpoint = ip ? `/${ip}/json` : '/json';
    const res = await this.ipClient['client'].get<IPAPIResponse>(endpoint);
    const data = res.data;
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
    };
  }

  async getPublicHolidays(year: number, countryCode: string): Promise<PublicHoliday[]> {
    const res = await this.holidayClient['client'].get<NagerHolidayResponse[]>(`/PublicHolidays/${year}/${countryCode}`);
    return res.data.map((h) => ({
      date: h.date,
      localName: h.localName,
      name: h.name,
      countryCode: h.countryCode,
      fixed: h.fixed,
      global: h.global,
      types: h.types,
    }));
  }

  async getNextPublicHolidays(countryCode: string): Promise<PublicHoliday[]> {
    const res = await this.holidayClient['client'].get<NagerHolidayResponse[]>(`/NextPublicHolidays/${countryCode}`);
    return res.data;
  }
}
