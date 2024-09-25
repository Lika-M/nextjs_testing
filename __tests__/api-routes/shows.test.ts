import { testApiHandler } from "next-test-api-route-handler";

import showsHandler from "@/pages/api/shows/index";
import { readFakeData } from "@/__tests__/__mocks__/fakeData";

it("GET request to api/shows returns shows from database", async () => {
  await testApiHandler({
    handler: showsHandler,
    // requestPatcher is optional
    // requestPatcher(request) {
    //   request.headers ={key: process.env.SPECIAL_TOKEN};
    // }, 
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();

      const fakeData = await readFakeData();
      const { fakeShows } = fakeData;
      console.log('json: ', json);
      expect(json).toEqual({ shows: fakeShows });
    }
  });
});