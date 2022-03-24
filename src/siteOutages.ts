import { OutageClient } from "./apiClient";
import { SiteOutage } from "./apiClient/types";
import { filterEarlyOutages, makeDeviceNameMapper } from "./util";

async function getSiteOutages(
  client: OutageClient,
  siteId: string
): Promise<SiteOutage[]> {
  const outages = await client.getOutages();
  const siteInfo = await client.getSiteInfo(siteId);

  const recentOutages = outages.data.filter(filterEarlyOutages);

  return recentOutages
    .map(makeDeviceNameMapper(siteInfo.data))
    .filter((siteOutage) => siteOutage !== undefined) as SiteOutage[];
}

export async function main(
  baseURL: string,
  apiKey: string,
  siteId: string
): Promise<void> {
  const client = new OutageClient({
    baseURL,
    apiKey,
  });
  const siteOutages = await getSiteOutages(client, siteId);
  await client.createSiteOutages(siteId, siteOutages);
}
