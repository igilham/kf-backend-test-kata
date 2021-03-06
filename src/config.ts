import { DateTime } from "luxon";

// use functions for config so it's easy to mock them later

export const getBaseURL = () =>
  "https://api.krakenflex.systems/interview-tests-mock-api/v1";

export const getAPIKey = () => "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23";

export const getEarliestValidTimestamp = () =>
  DateTime.fromISO("2022-01-01T00:00:00.000Z");

export const getSiteId = () => "norwich-pear-tree";
