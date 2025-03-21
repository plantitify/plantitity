export interface Point {
  latitude?: number;
  longitude?: number;
}

export interface SimilarImage {
  id?: string;
  url?: string;
  license_name?: string;
  license_url?: string;
  citation?: string;
  similarity?: number;
  url_small?: string;
}

export interface InputData {
  latitude?: number;
  longitude?: number;
  similar_images?: boolean;
  images?: string[];
  datetime?: string;
}

export interface IsPlant {
  probability?: number;
  binary?: boolean;
  threshold?: number;
}

export interface Details {
  language?: string;
  entity_id?: string;
}

export interface Suggestion {
  id?: string;
  name?: string;
  probability?: number;
  similar_images?: SimilarImage[];
  details?: Details;
}

export interface Classification {
  suggestions?: Suggestion[];
}

export interface Result {
  is_plant?: IsPlant;
  classification?: Classification;
}

export interface IdentificationData {
  access_token?: string;
  model_version?: string;
  custom_id?: string | null;
  input?: InputData;
  result?: Result;
  status?: string;
  sla_compliant_client?: boolean;
  sla_compliant_system?: boolean;
  created?: number;
  completed?: number;
}

export class Identification implements IdentificationData {
  access_token?: string;
  model_version?: string;
  custom_id?: string | null;
  input?: InputData;
  result?: Result;
  status?: string;
  sla_compliant_client?: boolean;
  sla_compliant_system?: boolean;
  created?: number;
  completed?: number;

  constructor(data: IdentificationData) {
    this.access_token = data.access_token;
    this.model_version = data.model_version;
    this.custom_id = data.custom_id;
    this.input = data.input;
    this.result = data.result;
    this.status = data.status;
    this.sla_compliant_client = data.sla_compliant_client;
    this.sla_compliant_system = data.sla_compliant_system;
    this.created = data.created;
    this.completed = data.completed;
  }

  static fromJson(data: IdentificationData): Identification {
    return new Identification(data);
  }

  toJson(): IdentificationData {
    return {
      access_token: this.access_token,
      model_version: this.model_version,
      custom_id: this.custom_id,
      input: this.input,
      result: this.result,
      status: this.status,
      sla_compliant_client: this.sla_compliant_client,
      sla_compliant_system: this.sla_compliant_system,
      created: this.created,
      completed: this.completed,
    };
  }
}
