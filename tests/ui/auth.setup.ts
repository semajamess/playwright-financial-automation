import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.executeSecureLogin();
  await expect(page.getByRole("link", { name: "Log Out" })).toBeVisible();
  await page.context().storageState({ path: authFile });
});
