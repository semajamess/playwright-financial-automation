import { test, expect } from "@playwright/test";

test("API Pre-Check: Secure Vault Connection", async () => {
  // 1. Grab the secrets from your hidden .env vault
  const brokerUrl = process.env.BASE_URL;
  const username = process.env.TEST_USER;
  const password = process.env.TEST_PASS;

  // 2. Print them to the console (just for us to verify it works)
  console.log(`Connecting to trading broker at: ${brokerUrl}`);
  console.log(`Authenticating order execution for: ${username}`);

  // 3. Assert that the vault actually loaded the data and it isn't "undefined"
  expect(brokerUrl).toBeDefined();
  expect(username).toBe("qa_automation_user");
  expect(password).toBeDefined();
});
