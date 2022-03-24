import { DateTime } from "luxon";
import { Outage, SiteInfo } from "./apiClient/types";
import { getEarliestValidTimestamp } from "./config";

export const filterEarlyOutages = (outage: Outage): boolean => {
  const begin = DateTime.fromISO(outage.begin);
  return begin >= getEarliestValidTimestamp();
};

export const makeDeviceFilter =
  (siteInfo: SiteInfo) =>
  (outage: Outage): boolean =>
    !!siteInfo.devices.find((device): boolean => device.id === outage.id);
