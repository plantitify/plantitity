import { Api } from "../api";
import { Identification, IdentificationData } from "../models/identification";

export class IdentificationService {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async create(attrs: string[]): Promise<Identification> {
    const response = await this.api.post("/identification", attrs);

    try {
      const identificationData = response as IdentificationData;
      const identification = Identification.fromJson(identificationData);
      return identification;
    } catch {
      throw new Error(
        "Response is expected to have the form of IdentificationData."
      );
    }
  }
}
