import { DateTime } from "luxon";
import { Outage, SiteInfo, SiteOutage } from "./apiClient/types";
import { getEarliestValidTimestamp } from "./config";

export const filterEarlyOutages = (outage: Outage): boolean => {
  const begin = DateTime.fromISO(outage.begin);
  return begin >= getEarliestValidTimestamp();
};

export const makeDeviceNameMapper =
  (siteInfo: SiteInfo) =>
  (outage: Outage): SiteOutage | undefined => {
    const device = siteInfo.devices.find((device) => device.id === outage.id);
    if (device) {
      return {
        ...outage,
        name: device.name,
      };
    }
    // drop entries for which we can't match the device ID
    return undefined;
  };
