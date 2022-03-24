# KF Test Solution

## Setup instructions

This is an NPM project with pinned dependencies so the usual workflow with NPM applies:

```shell
npm ci
```

## Commentary

I started by setting up a basic Typescript project with npm and adding a linter. I used a one-line entry-point to make sure the compiler was set up correctly.

The first technical task was to model the JSON response types from the APIs. These are in `src/apiClient/types.ts`. I wanted to get a basic client working quickly to test the API key and make sure I understood the interfaces so I pulled in Axios and built a very simple wrapper around the `GET /outages` endpoint. I put the config in a file and wrote a quick test to hit the endpoint and pull data out of the response. I'm assuming the API key is not very sensitive for this task so I'm not worrying about putting in a secret management service for now. The key can always be invalidated and replaced after the rapid iteration phase if it needs to be stored more securely.
