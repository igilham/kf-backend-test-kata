import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Outage } from "./types";

export interface OutageClientOptions {
  baseURL: string;
  apiKey: string;
}

export class OutageClient {
  readonly #client: AxiosInstance;

  constructor(opts: OutageClientOptions) {
    this.#client = axios.create({
      baseURL: opts.baseURL,
      headers: {
        "X-API-Key": opts.apiKey,
      },
    });
  }

  async getOutages(): Promise<AxiosResponse<Outage[]>> {
    return this.#client.get("/outages");
  }
}
