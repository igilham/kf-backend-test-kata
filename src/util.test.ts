import { Device, Outage } from "./apiClient/types";
import { getEarliestValidTimestamp } from "./config";
import {
  filterEarlyOutages,
  makeDeviceFilter,
  makeDeviceNameMapper,
} from "./util";

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
  id: "late",
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

const earlyDevice: Device = {
  id: "early",
  name: "Early Device",
};

const epochDevice: Device = {
  id: "epoch",
  name: "Epoch Device",
};

const lateDevice: Device = {
  id: "late",
  name: "Late Device",
};

const siteInfo = {
  id: "fake-site",
  name: "Fake Site",
  devices: [earlyDevice, epochDevice, lateDevice],
};

describe("filterEarlyOutages", () => {
  test("filters out early dates", () => {
    expect(outages.filter(filterEarlyOutages)).toEqual([
      epochOutage,
      lateOutage,
      lateOutage2,
    ]);
  });
});

describe("siteFilter", () => {
  const filter = makeDeviceFilter(siteInfo);

  test("filters out unmatched devices", () => {
    expect(outages.filter(filter)).toEqual([
      earlyOutage,
      epochOutage,
      lateOutage,
    ]);
  });
});

describe("deviceNameMapper", () => {
  const deviceMapper = makeDeviceNameMapper(siteInfo);

  test("maps device names for found devices, dropping others", () => {
    const result = outages.map(deviceMapper);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          ...earlyOutage,
          name: earlyDevice.name,
        },
        {
          ...epochOutage,
          name: epochDevice.name,
        },
        {
          ...lateOutage,
          name: lateDevice.name,
        },
      ])
    );
    expect(result).not.toContainEqual(
      expect.objectContaining({
        earlyOutage2,
      })
    );
    expect(result).not.toContainEqual(
      expect.objectContaining({
        earlyOutage3,
      })
    );
    expect(result).not.toContainEqual(
      expect.objectContaining({
        lateOutage2,
      })
    );
  });
});
