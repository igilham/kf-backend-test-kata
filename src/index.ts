import { OutageClient } from "./apiClient";
import { SiteOutage } from "./apiClient/types";
import { getAPIKey, getBaseURL, getSiteId } from "./config";
import { filterEarlyOutages, makeDeviceNameMapper } from "./util";

async function main() {
  const client = new OutageClient({
    baseURL: getBaseURL(),
    apiKey: getAPIKey(),
  });
  const outages = await client.getOutages();
  const siteInfo = await client.getSiteInfo(getSiteId());

  const recentOutages = outages.data.filter(filterEarlyOutages);

  const siteOutages = recentOutages
    .map(makeDeviceNameMapper(siteInfo.data))
    .filter((siteOutage) => siteOutage !== undefined) as SiteOutage[];

  await client.createSiteOutages("siteId", siteOutages);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e.message ?? "unknown error");
  });
