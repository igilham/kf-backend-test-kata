import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Outage, SiteInfo, SiteOutage } from "./types";

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

  async getSiteInfo(siteId: string): Promise<AxiosResponse<SiteInfo>> {
    return this.#client.get(`/site-info/${siteId}`);
  }

  async createSiteOutages(
    siteId: string,
    outages: SiteOutage[]
  ): Promise<AxiosResponse<unknown>> {
    return this.#client.post(`/site-outages/${siteId}`, outages);
  }
}
