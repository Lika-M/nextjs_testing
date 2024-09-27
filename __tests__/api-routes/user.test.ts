import { testApiHandler } from "next-test-api-route-handler";

import userAuthHandler from "@/pages/api/users/index";

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