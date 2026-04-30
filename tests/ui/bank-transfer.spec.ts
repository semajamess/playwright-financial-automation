import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { TransferFundsPage } from "../../pages/TransferFundsPage";
import { AccountsOverviewPage } from "../../pages/AccountsOverviewPage";
import { CurrencyHelper } from "../../utils/CurrencyHelper";

test("Bank Transaction: Execute $50 Transfer and Verify Ledger Math", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const transferPage = new TransferFundsPage(page);
  const accountsPage = new AccountsOverviewPage(page);

  const transferAmount = 50;
  let initialBalanceNumber = 0;
  let expectedBalance = 0;

  await test.step("Authenticate user securely", async () => {
    await loginPage.goto();
    await loginPage.executeSecureLogin();
  });

  await test.step("Capture initial ledger balance and calculate expected outcome", async () => {
    const initialBalanceText = await accountsPage.getFirstAccountBalance();
    initialBalanceNumber = CurrencyHelper.convertToNumber(initialBalanceText);
    expectedBalance = initialBalanceNumber - transferAmount;
  });

  await test.step(`Execute transfer of $${transferAmount}`, async () => {
    await transferPage.goto();
    await transferPage.executeTransfer(transferAmount.toString());
    await expect(
      page.getByRole("heading", { name: "Transfer Complete" }),
    ).toBeVisible();
  });

  await test.step("Verify Ledger math on Accounts Overview", async () => {
    await page.getByRole("link", { name: "Accounts Overview" }).click();
    const newBalanceText = await accountsPage.getFirstAccountBalance();
    const newBalanceNumber = CurrencyHelper.convertToNumber(newBalanceText);

    expect(newBalanceNumber).toBe(expectedBalance);
  });
});
