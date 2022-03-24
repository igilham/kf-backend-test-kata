import { OutageClient } from ".";
import { getAPIKey, getBaseURL } from "../config";
import { Outage } from "./types";

describe("apiClient", () => {
  test("can get outages", async () => {
    const client = new OutageClient({
      baseURL: getBaseURL(),
      apiKey: getAPIKey(),
    });
    const response = await client.getOutages();

    expect(response.data.length).toBeGreaterThan(0);
    for (const outage of response.data) {
      expect(outage).toHaveProperty("begin");
      expect(outage).toHaveProperty("end");
      expect(outage).toHaveProperty("id");
    }
  });

  test("can get site info", async () => {
    const client = new OutageClient({
      baseURL: getBaseURL(),
      apiKey: getAPIKey(),
    });
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
});
