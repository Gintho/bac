import { HttpClient } from '../../core/http-client';

export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  windSpeed: number;
  icon: string;
}

export interface ForecastDay {
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
  humidity: number;
  icon: string;
}

interface OWMCurrentResponse {
  name: string;
  sys: { country: string };
  main: { temp: number; feels_like: number; humidity: number };
  weather: Array<{ description: string; icon: string }>;
  wind: { speed: number };
}

interface OWMForecastResponse {
  list: Array<{
    dt_txt: string;
    main: { temp_min: number; temp_max: number; humidity: number };
    weather: Array<{ description: string; icon: string }>;
  }>;
}

/**
 * OpenWeatherMap API — https://openweathermap.org/api
 * Free tier: 1,000 calls/day
 * Get your key at: https://home.openweathermap.org/users/sign_up
 */
export class WeatherAPI extends HttpClient {
  constructor(apiKey: string) {
    super({
      baseURL: 'https://api.openweathermap.org/data/2.5',
      apiKeyParam: 'appid',
      apiKey,
    });
  }

  async getCurrentWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeather> {
    const data = await this.get<OWMCurrentResponse>('/weather', { q: city, units });
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  }

  async getCurrentWeatherByCoords(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<CurrentWeather> {
    const data = await this.get<OWMCurrentResponse>('/weather', { lat, lon, units });
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  }

  async getForecast(city: string, days: number = 5, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastDay[]> {
    const data = await this.get<OWMForecastResponse>('/forecast', { q: city, cnt: days * 8, units });
    // Group by day and pick one entry per day (noon)
    const grouped: Record<string, typeof data.list[0]> = {};
    for (const item of data.list) {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date] || item.dt_txt.includes('12:00')) {
        grouped[date] = item;
      }
    }
    return Object.entries(grouped).slice(0, days).map(([date, item]) => ({
      date,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      description: item.weather[0].description,
      humidity: item.main.humidity,
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    }));
  }
}
