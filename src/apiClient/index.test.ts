import { OutageClient } from ".";
import { getAPIKey, getBaseURL } from "../config";
import { Outage, SiteOutage } from "./types";

describe("apiClient", () => {
  const client = new OutageClient({
    baseURL: getBaseURL(),
    apiKey: getAPIKey(),
  });

  test("can get outages", async () => {
    const response = await client.getOutages();

    expect(response.data.length).toBeGreaterThan(0);
    for (const outage of response.data) {
      expect(outage).toHaveProperty("begin");
      expect(outage).toHaveProperty("end");
      expect(outage).toHaveProperty("id");
    }
  });

  test("can get site info", async () => {
    const response = await client.getSiteInfo("norwich-pear-tree");

    expect(response.data).toEqual({
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
      devices: expect.arrayContaining([
        expect.objectContaining({
          id: "111183e7-fb90-436b-9951-63392b36bdd2",
          name: "Battery 1",
        }),
      ]),
    });
  });

  test.skip("can post outages", async () => {
    const outages: SiteOutage[] = [
      {
        id: "fake-id",
        begin: "2022-04-22T12:00:00Z",
        end: "2022-04-22T13:00:00Z",
        name: "Battery 1",
      },
    ];
    const response = await client.createSiteOutages(
      "norwich-pear-tree",
      outages
    );

    expect(response.data).toEqual({
      id: "norwich-pear-tree",
      name: "Norwich Pear Tree",
    });
  });
});
