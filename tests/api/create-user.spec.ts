import { test, expect, request as playwrightRequest } from "@playwright/test";

test("using POST request on creating a user", async () => {
  const cleanRequest = await playwrightRequest.newContext();
  const response = await cleanRequest.post("https://reqres.in/api/users", {
    headers: {
      "x-api-key": process.env.REQRES_API_KEY as string,
    },

    data: {
      name: "James",
      job: "QA automation engineer",
    },
  });

  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  expect(responseBody.name).toBe("James");
  console.log("name: ", responseBody);
});
