import { test } from "@playwright/test";
import { AccountsOverviewPage } from "../../pages/AccountsOverviewPage";

test("Bank Authentication: Secure UI Login", async ({ page }) => {
  const accountsPage = new AccountsOverviewPage(page);
  await test.step("Navigate directly to the authenticated dashboard", async () => {
    await accountsPage.goto();
  });

  await test.step("Verify dashboard access and balance visibility", async () => {
    await accountsPage.verifyTotalBalanceIsVisible();
  });
});
