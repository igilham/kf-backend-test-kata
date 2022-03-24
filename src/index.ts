import { OutageClient } from "./apiClient";
import { SiteOutage } from "./apiClient/types";
import { getAPIKey, getBaseURL, getSiteId } from "./config";
import { filterEarlyOutages, makeDeviceFilter } from "./filters";

async function main() {
  const client = new OutageClient({
    baseURL: getBaseURL(),
    apiKey: getAPIKey(),
  });
  const outages = await client.getOutages();
  const siteInfo = await client.getSiteInfo(getSiteId());

  const recentOutages = outages.data.filter(filterEarlyOutages);
  const outagesForSite = recentOutages.filter(makeDeviceFilter(siteInfo.data));
  const siteOutages = outagesForSite.map((outage): SiteOutage => {
    // TODO: transform to correct format
    return {
      ...outage,
      name: "some name",
    };
  });
  await client.createSiteOutages("siteId", siteOutages);
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e.message ?? "unknown error");
  });
