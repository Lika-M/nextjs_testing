import { testApiHandler } from "next-test-api-route-handler";

import showsHandler from "@/pages/api/shows/index";
import { readFakeData } from "@/__tests__/__mocks__/fakeData";

import showIdHandler from "@/pages/api/shows/[showId]";

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
      expect(json).toEqual({ shows: fakeShows });
    }
  });
});

it("GET api/shows/[showId] returns data for the correct show ID", async () => {
  await testApiHandler({
    handler: showIdHandler,
    // dynamic show id
    paramsPatcher: (params) => { params["showId"] = 0 },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      console.log(json)
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ show: fakeShows[0] });
    }
  });
});

it("POST api/shows returns 401 unauthorize for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: showsHandler,
    paramsPatcher: (params) => {
      // query string param
      params.queryStringUrlParams = "WRONG_REVALIDATION_SECRET";
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" })
      expect(res.status).toBe(401);
    }
  });
});
