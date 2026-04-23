import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { TransferFundsPage } from "../../pages/TransferFundsPage";
import { AccountsOverviewPage } from "../../pages/AccountsOverviewPage";
import { CurrencyHelper } from "../../utils/CurrencyHelper";

test("Bank Transaction: Execute $50 Transfer", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transferPage = new TransferFundsPage(page);
  const accountsPage = new AccountsOverviewPage(page);

  console.log("1. Authenticating...");
  await loginPage.goto();
  await loginPage.executeSecureLogin();

  console.log("2. Capturing Initial Balance...");
  const initialBalanceText = await accountsPage.getFirstAccountBalance();
  const initialBalanceNumber =
    CurrencyHelper.convertToNumber(initialBalanceText);
  console.log(`initial balance: $${initialBalanceNumber}`);

  console.log("3. Executing transfer of $50...");
  await transferPage.goto();
  await transferPage.executeTransfer("50");
  await expect(
    page.getByRole("heading", { name: "Transfer Complete!" }),
  ).toBeVisible();

  console.log("4. Verifying success message...");
  await page.locator("a").filter({ hasText: "Accounts Overview" }).click();

  const newBalanceText = await accountsPage.getFirstAccountBalance();
  const newBalanceNumber = CurrencyHelper.convertToNumber(newBalanceText);
  console.log(`New Balance: $${newBalanceNumber}`);

  console.log("5. Asserting Ledger Math");
  expect(newBalanceNumber).toBe(initialBalanceNumber);
});
