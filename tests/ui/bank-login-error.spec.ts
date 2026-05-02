import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test("Bank Authentication: Invalid Login Rejection", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step("Ensure clean logged-out state", async () => {
    await page.goto("https://parabank.parasoft.com/parabank/logout.htm");
  });

  await test.step("Attempt login with dynamically generated invalid credentials", async () => {
    await loginPage.goto();

    const uniqueBadUser = `invalid_${Date.now()}`;

    await page.locator('input[name="username"]').fill(uniqueBadUser);
    await page.locator('input[name="password"]').fill("badpass123");
    await page.locator('input[value="Log In"]').click();
  });

  await test.step("Verify system rejects access gracefully", async () => {
    await expect(
      page.getByText(/The username and password could not be verified/i),
    ).toBeVisible();
  });
});
