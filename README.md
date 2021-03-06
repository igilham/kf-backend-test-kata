# KF Test Solution

## Setup instructions

This is an NPM project with pinned dependencies so the usual workflow with NPM applies:

```shell
npm ci
```

To build the Typescript code use `npm run build`. To run the linter or auto-format the source code, use `npm run lint` and `npm run fmt`, respectively. The unit tests can be run with `npm t`.

## Running the app

The code can be bundled for distribution using `npm run bundle` and run directly with `npm run start`. The tool can be started in multiple ways:

* `npm run bundle && npm run start`. `start` just calls `node bundle/index.js`
* `npm run build && node dist/index.js`
* `npx ts-node src/index.js`

## Commentary

This section is a bit rambling. I wrote it continuously as a stream of my thoughts while building the project and making commits. It may make more sense to read it piece-by-piece while skimming through the commits in the repo history.

I started by setting up a basic Typescript project with npm and adding a linter. I used a one-line entry-point to make sure the compiler was set up correctly.

The first technical task was to model the JSON response types from the APIs. These are in `src/apiClient/types.ts`. I wanted to get a basic client working quickly to test the API key and make sure I understood the interfaces so I pulled in Axios and built a very simple wrapper around the `GET /outages` endpoint. I put the config in a file and wrote a quick test to hit the endpoint and pull data out of the response. I'm assuming the API key is not very sensitive for this task so I'm not worrying about putting in a secret management service for now. The key can always be invalidated and replaced after the rapid iteration phase if it needs to be stored more securely.

From there I filled out the remaining client API calls and adjusted the tests as I went to make sure I understood the API responses and that the calls were getting through to the server. I found that posting fake data to the site-outages endpoint resulted in a 400 response so I skipped the test for the time being. The client tests only really exist to help me figure out how to write and use the client so the responses don't really matter yet.

At this point I felt like sketching out the basic flow of the application itself so I wrote the begginings of a crude `main` function in `src/index.ts` to get a feel for the rough code structure that would be needed. This is all throw-away work at this stage.

Next, I started on the filters starting with the date. I wrote a simple check and threw in a couple of basic tests for the boolean result first. Then I replaced these with more representative tests to filter real arrays and renamed the filter function to be clearer.

The device ID filter was slightly more complex due to the need to capture the site info object. I used the arrow syntax to curry the function to create the filter and added a suitable test using some of the existing test data.

Mapping device names onto outages last reveals a design problem. The compiler doesn't know that the device can be found. To resolve this we can use `as` to tell it to trust us. This breaks down when we try to refactor out the mapping function, as we can no longer make the same guarantee. At this point it becomes necessary to refactor the main algorithm so that type safety can be maintained. A solution to this is to perform the mapping earlier and simply drop the outages that don't match a device, then filter out the undefined entries in the resulting array. There is a balance to strike between testability, composability and ease of use for the API here. It is easier to get it right by building small, composable pieces and testing each, but the usability can suffer. When reafactoring for the client (the main function), a more end-to-end test approach becomes more suitable.

Now all the building blocks are in place, we can start trying to run the main function in a test harness and validate the behaviour end-to-end. For this I extracted `main` to a new file and wrote a `nock` test around it with the supplied fake inputs and expected outputs.

This completes the task and leaves a little cleaning up to do around the tests, refactoring and error handling. I'm running out of time for the final cleanup this evening, but I might also look at logging and general UX in success/failure scenarios. The entry point handles basic errors but not in a very useful of elegant way at present.

I've added a bundler using esbuild to make a small, self-contained distribution.

## Closing thoughts

On the final requirement around handling `500` errors - My code will catch the error, print a pretty useless message and quit at the moment. No harm is done and the user is free to retry. It is possible to add retry loops etc. but that seems overkill for a small command-line-utility.

I also put all the inputs into a config file. I'd expect a tool like this to accept command-line arguments for that purpose but it's probably out of scope for the purpose of the exercise. I've used `commander` for this in the past.
