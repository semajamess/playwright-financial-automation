import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { TransferFundsPage } from "../../pages/TransferFundsPage";
import { AccountsOverviewPage } from "../../pages/AccountsOverviewPage";
import { CurrencyHelper } from "../../utils/CurrencyHelper";

test("Bank Transaction: Execute $50 Transfer and Verify Ledger Math", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Stateful ledger test restricted to chromium to prevent parallel worker collision",
  );

  const loginPage = new LoginPage(page);
  const transferPage = new TransferFundsPage(page);
  const accountsPage = new AccountsOverviewPage(page);

  const transferAmount = 50;

  let fromAccountId = "";
  let toAccountId = "";
  let expectedFromBalance = 0;
  let expectedToBalance = 0;

  await test.step("Authenticate user", async () => {
    await loginPage.goto();
    await loginPage.executeSecureLogin();
  });

  await test.step("Navigate to Accounts Overview", async () => {
    await accountsPage.goto();
  });

  await test.step("Ensure test data exists and capture initial balances", async () => {
    let accountIds = await accountsPage.getAvailableAccountIds();

    if (accountIds.length < 2) {
      console.log(
        "Only 1 account detected. Automating the creation of a second account...",
      );

      await page.getByRole("link", { name: "Open New Account" }).click();
      await page.getByRole("button", { name: "Open New Account" }).click();
      await expect(
        page.getByRole("heading", { name: /Account Opened/i }),
      ).toBeVisible();
      await accountsPage.goto();
      await page.locator("#accountTable a").nth(1).waitFor();
      accountIds = await accountsPage.getAvailableAccountIds();
    }

    expect(accountIds.length).toBeGreaterThanOrEqual(2);

    fromAccountId = accountIds[0];
    toAccountId = accountIds[1];

    expect(fromAccountId).not.toEqual(toAccountId);

    const initialFromText =
      await accountsPage.getBalanceForAccount(fromAccountId);
    const initialToText = await accountsPage.getBalanceForAccount(toAccountId);

    const initialFromNumber = CurrencyHelper.convertToNumber(initialFromText);
    const initialToNumber = CurrencyHelper.convertToNumber(initialToText);

    expectedFromBalance = initialFromNumber - transferAmount;
    expectedToBalance = initialToNumber + transferAmount;
  });

  await test.step(`Execute transfer of $${transferAmount} between targeted accounts`, async () => {
    await transferPage.goto();
    await transferPage.selectFromAccount(fromAccountId);
    await transferPage.selectToAccount(toAccountId);
    await transferPage.executeTransfer(transferAmount.toString());

    await expect(
      page.getByRole("heading", { name: /Transfer Complete/i }),
    ).toBeVisible();
  });

  await test.step("Verify Ledger math on both target accounts", async () => {
    await accountsPage.goto();

    const finalFromText =
      await accountsPage.getBalanceForAccount(fromAccountId);
    const finalToText = await accountsPage.getBalanceForAccount(toAccountId);

    const finalFromNumber = CurrencyHelper.convertToNumber(finalFromText);
    const finalToNumber = CurrencyHelper.convertToNumber(finalToText);

    expect(finalFromNumber).toBe(expectedFromBalance);
    expect(finalToNumber).toBe(expectedToBalance);
  });
});
