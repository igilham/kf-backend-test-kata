# KF Test Solution

## Setup instructions

This is an NPM project with pinned dependencies so the usual workflow with NPM applies:

```shell
npm ci
```

To build the Typescript code use `npm run build`. To run the linter or auto-format the source code, use `npm run lint` and `npm run fmt`, respectively.

## Commentary

I started by setting up a basic Typescript project with npm and adding a linter. I used a one-line entry-point to make sure the compiler was set up correctly.

The first technical task was to model the JSON response types from the APIs. These are in `src/apiClient/types.ts`. I wanted to get a basic client working quickly to test the API key and make sure I understood the interfaces so I pulled in Axios and built a very simple wrapper around the `GET /outages` endpoint. I put the config in a file and wrote a quick test to hit the endpoint and pull data out of the response. I'm assuming the API key is not very sensitive for this task so I'm not worrying about putting in a secret management service for now. The key can always be invalidated and replaced after the rapid iteration phase if it needs to be stored more securely.

From there I filled out the remaining client API calls and adjusted the tests as I went to make sure I understood the API responses and that the calls were getting through to the server. I found that posting fake data to the site-outages endpoint resulted in a 400 response so I skipped the test for the time being. The client tests only really exist to help me figure out how to write and use the client so the responses don't really matter yet.

At this point I felt like sketching out the basic flow of the application itself so I wrote the begginings of a crude `main` function in `src/index.ts` to get a feel for the rough code structure that would be needed. This is all throw-away work at this stage.

Next, I started on the filters starting with the date. I wrote a simple check and threw in a couple of basic tests for the boolean result first. Then I replaced these with more representative tests to filter real arrays and renamed the filter function to be clearer.
