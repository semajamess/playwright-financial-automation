import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
  }

  async goto() {
    await this.navigate("/index.htm");
  }

  async executeSecureLogin() {
    const logoutLink = this.page.getByRole("link", { name: "Log Out" });
    if (await logoutLink.isVisible()) {
      return;
    }

    await this.usernameInput.waitFor({ state: "visible" });
    await this.passwordInput.waitFor({ state: "visible" });
    await this.usernameInput.fill(process.env.TEST_USER as string);
    await this.passwordInput.fill(process.env.TEST_PASS as string);
    await this.loginButton.click();
    await expect(logoutLink).toBeVisible();
  }

  async executeInvalidLogin(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
