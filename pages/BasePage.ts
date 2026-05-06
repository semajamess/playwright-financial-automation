import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    const baseUrl = process.env.BASE_URL;

    if (baseUrl && baseUrl.trim().length > 0) {
      const normalizedBase = baseUrl.endsWith("/")
        ? baseUrl.slice(0, -1)
        : baseUrl;
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      await this.page.goto(`${normalizedBase}${normalizedPath}`);
      return;
    }

    const relativePath = path.startsWith("/") ? path.slice(1) : path;
    await this.page.goto(relativePath);
  }
}
