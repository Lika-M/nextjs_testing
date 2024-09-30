import { testApiHandler } from "next-test-api-route-handler";

import userAuthHandler from "@/pages/api/users/index";
import userReservationsHandler from "@/pages/api/users/[userId]/reservations";

jest.mock("@/lib/auth/utils");

it("POST api/users receives a token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    // requestPatcher is optional
    // requestPatcher(request) {
    //   request.headers ={key: process.env.SPECIAL_TOKEN};
    // }, 
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: "test@test.test", password: "test" })
      });
      expect(res.status).toBe(200);

      const json = await res.json();

      expect(json).toHaveProperty("user");
      expect(json.user.email).toEqual("test@test.test");
      expect(json.user.id).toBe(1);
      expect(json.user).toHaveProperty("token");
    }
  });
});

it("GET api/users/[userId]/reservations returns correct number of reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => { params["userId"] = 1 },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      console.log(json); 
      expect(json.userReservations).toHaveLength(2);
    }
  });
});

it("GET api/users/[userId]/reservations returns empty array for user without reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => { params["userId"] = 12345 },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      expect(res.status).toBe(200);

      const json = await res.json();
      expect(json.userReservations).toHaveLength(0);
    }
  });
});