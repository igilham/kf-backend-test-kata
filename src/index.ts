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

  const siteOutages = recentOutages
    .map((outage): SiteOutage | undefined => {
      const device = siteInfo.data.devices.find(
        (device) => device.id === outage.id
      );
      if (device) {
        return {
          ...outage,
          name: device.name,
        };
      }
      // drop entries for which we can't match the device ID
      return undefined;
    })
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
