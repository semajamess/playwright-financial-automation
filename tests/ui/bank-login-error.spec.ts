import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test("Login error test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.executeInvalidLogin("james", "dem");
  await expect(
    page.getByText("The username and password could not be verified."),
  ).toBeVisible();
});
