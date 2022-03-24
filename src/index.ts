import { getAPIKey, getBaseURL, getSiteId } from "./config";
import { main } from "./siteOutages";

main(getBaseURL(), getAPIKey(), getSiteId())
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e.message ?? "unknown error");
  });
