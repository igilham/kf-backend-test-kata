import { Outage } from "./apiClient/types";
import { getEarliestValidTimestamp } from "./config";
import { filterEarlyOutages } from "./filters";

describe("filterEarlyOutages", () => {
  const earlyOutage: Outage = {
    begin: "2020-06-06T00:00:00Z",
    end: "2020-06-07T00:00:00Z",
    id: "early",
  };

  const earlyOutage2: Outage = {
    begin: "2021-06-06T00:00:00Z",
    end: "2021-06-07T00:00:00Z",
    id: "early2",
  };

  const earlyOutage3: Outage = {
    begin: "2021-12-12T23:59:59.999Z",
    end: "2022-01-01T01:00:00Z",
    id: "early3",
  };

  const epochOutage: Outage = {
    begin: getEarliestValidTimestamp().toISO(),
    end: "2022-01-01T01:00:00Z",
    id: "epoch",
  };

  const lateOutage: Outage = {
    begin: "2022-01-01T00:00:00.001Z",
    end: "2022-01-01T01:00:00Z",
    id: "late1",
  };

  const lateOutage2: Outage = {
    begin: "2023-06-06T00:00:00Z",
    end: "2023-06-07T00:00:00Z",
    id: "late2",
  };

  const outages: Outage[] = [
    earlyOutage,
    earlyOutage2,
    earlyOutage3,
    epochOutage,
    lateOutage,
    lateOutage2,
  ];

  test("filters out early dates", () => {
    expect(outages.filter(filterEarlyOutages)).toEqual([
      epochOutage,
      lateOutage,
      lateOutage2,
    ]);
  });
});
