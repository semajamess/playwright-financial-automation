import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TransferFundsPage extends BasePage {
  readonly inputAmount: Locator;
  readonly fromAccountDropdown: Locator;
  readonly toAccountDropdown: Locator;
  readonly transferButton: Locator;

  constructor(page: Page) {
    super(page);

    this.inputAmount = page.locator("#amount");
    this.fromAccountDropdown = page.locator("#fromAccountId");
    this.toAccountDropdown = page.locator("#toAccountId");
    this.transferButton = page.locator('input[value="Transfer"]');
  }

  async executeTransfer(amount: string) {
    await this.page
      .locator("#fromAccountId option")
      .first()
      .waitFor({ state: "attached" });
    await this.inputAmount.fill(amount);
    await this.transferButton.click();
  }

  async goto() {
    await this.navigate("/transfer.htm");
  }
}
