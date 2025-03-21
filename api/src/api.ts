import axios, { AxiosHeaders, AxiosResponse } from "axios";
import { IdentificationService } from "./services/identificationService";

export class Api {
  baseUrl: string;
  apiKey: string;
  identificationService?: IdentificationService;

  constructor(
    baseUrl = "/https://plant.id/api/v3",
    apiKey = "CQZ8AJwf4z0T7RuGiLWf6KtlNMkRsREQjdEWBC14szQXlzoFS2"
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  get identification(): IdentificationService {
    if (!this.identificationService) {
      this.identificationService = new IdentificationService(this);
    }
    return this.identificationService;
  }

  get headers(): AxiosHeaders {
    const headers = new AxiosHeaders();
    headers.set("Content type", "application/json");
    headers.set("Api-Key", this.apiKey);

    return headers;
  }

  async get(endpoint: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
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
