import { OutageClient } from "./apiClient";
import { Device, SiteOutage } from "./apiClient/types";
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
    // The compiler doesn't know that we can guarantee a successful find
    // (assuming the filter is correct), so we cast to Device to tell it to trust us.
    const device = siteInfo.data.devices.find(
      (device) => device.id === outage.id
    ) as Device;
    return {
      ...outage,
      name: device.name,
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
