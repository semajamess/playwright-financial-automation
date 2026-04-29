import { test, expect, request as playwrightRequest } from "@playwright/test";

test("Delete user using DELETE request", async () => {
  const cleanRequest = await playwrightRequest.newContext();
  const response = await cleanRequest.delete("https://reqres.in/api/users/2", {
    headers: {
      "x-api-key": process.env.REQRES_API_KEY as string,
    },
  });

  expect(response.status()).toBe(204);
});
