import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { AccountsOverviewPage } from "../../pages/AccountsOverviewPage";

test("Bank Authentication: Secure UI Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountsPage = new AccountsOverviewPage(page);

  console.log("1. Navigating to the bank portal");
  await loginPage.goto();

  console.log("2. Injecting vault credentials");
  await loginPage.executeSecureLogin();

  console.log("3. Verifying dashboard access and balance visibility");

  await accountsPage.verifyTotalBalanceIsVisible();
});
