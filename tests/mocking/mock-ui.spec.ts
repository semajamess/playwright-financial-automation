import { test } from "@playwright/test";

test("Mock API testing", async ({ page }) => {
  const fakePayLoad = [{ name: "James-Berry", id: 1 }];

  await page.route(
    "https://demo.playwright.dev/api-mocking/api/v1/fruits",
    async (route) => {
      await route.fulfill({ json: fakePayLoad });
    },
  );

  await page.goto("https://demo.playwright.dev/api-mocking");
  await page.pause();
});
