import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

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

  async verifyTotalBalanceIsVisible() {
    await expect(this.totalBalance).toBeVisible();
  }

  async getFirstAccountBalance(): Promise<string> {
    return await this.firstAccountBalance.innerText();
  }
}
