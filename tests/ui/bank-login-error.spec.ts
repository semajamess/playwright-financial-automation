import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.use({ storageState: { cookies: [], origins: [] } });

test("Bank Authentication: Invalid Login Rejection", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step("Ensure clean logged-out state", async () => {
    const baseUrl =
      process.env.BASE_URL ?? "https://parabank.parasoft.com/parabank";

    await page.goto(`${baseUrl}/logout.htm`, { waitUntil: "networkidle" });
    await page.goto(`${baseUrl}/index.htm`, { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", { name: /Customer Login/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Log Out" })).toHaveCount(0);
  });

  await test.step("Attempt login with dynamically generated invalid credentials", async () => {
    await loginPage.goto();
    await loginPage.executeInvalidLogin("", "");
  });

  await test.step("Verify system rejects access gracefully", async () => {
    await expect(
      page.getByText(/Please enter a username and password/i),
    ).toBeVisible();
  });
});
