import { OutageClient } from "./apiClient";
import { SiteOutage } from "./apiClient/types";
import { getAPIKey, getBaseURL } from "./config";
import { filterByDate } from "./filters";

async function main() {
  const client = new OutageClient({
    baseURL: getBaseURL(),
    apiKey: getAPIKey(),
  });
  const outages = await client.getOutages();
  const recentOutages = outages.data.filter(filterByDate);
  const outagesForSite = recentOutages.filter((outage) => {
    // TODO: filter by site ID
    return true;
  });
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
