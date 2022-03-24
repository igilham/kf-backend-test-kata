import { DateTime } from "luxon";
import { Outage } from "./apiClient/types";
import { getEarliestValidTimestamp } from "./config";

export function filterEarlyOutages(outage: Outage): boolean {
  const begin = DateTime.fromISO(outage.begin);
  return begin >= getEarliestValidTimestamp();
}
