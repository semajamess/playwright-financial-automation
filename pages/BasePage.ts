import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    const baseUrl = process.env.BASE_URL;
    await this.page.goto(`${baseUrl}${path}`);
  }
}
