import axios, { AxiosHeaders, AxiosResponse } from "axios";

export class Api {
  baseUrl: string;
  apiKey: string;

  constructor(
    baseUrl = "http://my-api.plantnet.org/v2",
    apiKey = "2b10CtggAuWlwUGGubfSRUp0gO"
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  get headers(): AxiosHeaders {
    const headers = new AxiosHeaders();
    headers.set("Content type", "application/json");
    headers.set("api-key", `${this.apiKey}`);

    return headers;
  }

  async get(endpoint: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint},`, {
        headers: this.headers,
      });

      return this.handleResponse(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to load data: ${error.response?.status}`);
      } else {
        throw new Error(`Failed to load data: ${error}`);
      }
    }
  }

  async post(endpoint: string, body: object) {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.headers,
      });

      return this.handleResponse(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to load data: ${error.response?.status}`);
      } else {
        throw new Error(`Failed to load data: ${error}`);
      }
    }
  }

  private handleResponse(response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Failed to load data: ${response.status}`);
    }
  }
}
