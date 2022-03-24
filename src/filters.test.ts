import { DateTime } from "luxon";
import { Outage } from "./apiClient/types";
import { filterByDate } from "./filters";

describe("filterByDate", () => {
  const earlyOutage: Outage = {
    begin: "2020-06-06T00:00:00Z",
    end: "2020-06-07T00:00:00Z",
    id: "early",
  };

  const lateOutage: Outage = {
    begin: "2023-06-06T00:00:00Z",
    end: "2023-06-07T00:00:00Z",
    id: "late",
  };

  test("basic negative case", () => {
    expect(filterByDate(earlyOutage)).toBe(false);
  });

  test("basic positive case", () => {
    expect(filterByDate(lateOutage)).toBe(true);
  });
});
