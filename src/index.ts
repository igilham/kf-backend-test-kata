import { getAPIKey, getBaseURL, getSiteId } from "./config";
import { main } from "./siteOutages";

main(getBaseURL(), getAPIKey(), getSiteId())
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    const message = e.message ?? "unknown error";
    console.error(`error encountered: ${message}`);
  });
