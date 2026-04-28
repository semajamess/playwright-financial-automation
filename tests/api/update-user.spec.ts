import { test, expect, request as playwrightRequest } from "@playwright/test";

test("Updating a user using PUT request", async () => {
  const cleanRequest = await playwrightRequest.newContext();
  const response = await cleanRequest.put("https://reqres.in/api/users/2", {
    headers: {
      "x-api-key": process.env.REQRES_API_KEY as string,
    },

    data: {
      name: "James",
      job: "Junior QA engineer",
    },
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.job).toBe("Junior QA engineer");
  console.log(responseBody);
});
