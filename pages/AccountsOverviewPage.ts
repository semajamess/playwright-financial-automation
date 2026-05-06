import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CurrencyHelper } from "../utils/CurrencyHelper";

export class AccountsOverviewPage extends BasePage {
  readonly totalBalance: Locator;
  readonly firstAccountBalance: Locator;

  constructor(page: Page) {
    super(page);

    this.totalBalance = page.locator("b").filter({ hasText: "$" }).first();
    this.firstAccountBalance = page
      .locator("td")
      .filter({ hasText: "$" })
      .first();
  }

  async getAvailableAccountIds(): Promise<string[]> {
    const accountLinks = this.page.locator("#accountTable a");
    await accountLinks.first().waitFor();
    return await accountLinks.allTextContents();
  }

  async goto() {
    await this.navigate("/overview.htm");
  }

  async getBalanceForAccount(accountId: string): Promise<string> {
    const row = this.page.locator("#accountTable tbody tr").filter({
      has: this.page.getByRole("link", { name: accountId, exact: true }),
    });

    return await row.locator("td").nth(1).innerText();
  }

  async verifyTotalBalanceIsVisible() {
    await expect(this.totalBalance).toBeVisible();
  }

  async getFirstAccountBalance(): Promise<string> {
    return await this.firstAccountBalance.innerText();
  }
}
