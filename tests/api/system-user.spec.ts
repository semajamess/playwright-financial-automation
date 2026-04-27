import { test, expect, request as playwrightRequest } from "@playwright/test";

test("API testing on the system", async () => {
  const cleanRequest = await playwrightRequest.newContext();
  const response = await cleanRequest.get("https://reqres.in/api/users/2", {
    headers: {
      "x-api-key": process.env.REQRES_API_KEY as string,
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.data.email).toBe("janet.weaver@reqres.in");
  console.log("SUCCESS! user email: ", responseBody.data.email);
});
