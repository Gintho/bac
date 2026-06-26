import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface HttpClientConfig {
  baseURL: string;
  apiKey?: string;
  apiKeyHeader?: string;
  apiKeyParam?: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

export class HttpClient {
  protected readonly client: AxiosInstance;
  private readonly apiKey?: string;
  private readonly apiKeyParam?: string;

  constructor(config: HttpClientConfig) {
    this.apiKey = config.apiKey;
    this.apiKeyParam = config.apiKeyParam;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders,
    };

    if (config.apiKey && config.apiKeyHeader) {
      headers[config.apiKeyHeader] = config.apiKey;
    }

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout ?? 10000,
      headers,
    });
  }

  protected buildParams(params: Record<string, unknown> = {}): Record<string, unknown> {
    if (this.apiKey && this.apiKeyParam) {
      return { [this.apiKeyParam]: this.apiKey, ...params };
    }
    return params;
  }

  protected async get<T>(path: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(path, {
      params: this.buildParams(params),
      ...config,
    });
    return response.data;
  }

  protected async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(path, data, config);
    return response.data;
  }
}
