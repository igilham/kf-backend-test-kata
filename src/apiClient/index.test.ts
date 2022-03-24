import { OutageClient } from ".";
import { getAPIKey, getBaseURL } from "../config";

describe("apiClient", () => {
  test("can get outages", async () => {
    const client = new OutageClient({
      baseURL: getBaseURL(),
      apiKey: getAPIKey(),
    });
    const response = await client.getOutages();

    expect(response.data).toHaveLength(108);
    expect(response.data[0]).toEqual({
      begin: "2022-06-25T13:25:43.022Z",
      end: "2022-07-07T06:24:28.857Z",
      id: "032f3efa-8e63-4c42-b3dd-1660ed44ce51",
    });
  });
});
