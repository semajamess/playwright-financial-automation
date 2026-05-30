import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left in code
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Use 2 workers in CI for better speed
  workers: process.env.CI ? 2 : undefined,

  // HTML report
  reporter: "html",

  use: {
    // Base URL
    baseURL: process.env.BASE_URL || "https://parabank.parasoft.com/parabank",

    // Recommended trace setting for CI
    trace: "on-first-retry",

    // Optional but recommended
    screenshot: "only-on-failure",
    video: "off",
    headless: true,
  },

  projects: [
    // Global auth setup
    {
      name: "setup",
      testMatch: "tests/ui/auth.setup.ts",
    },

    // Chromium
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    // Firefox
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    // WebKit
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
