# Financial Trading & QA Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Tested-brightgreen?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=github-actions)

An end-to-end (E2E) and API automation suite built with **Playwright** and **TypeScript**. This project demonstrates deterministic UI assertions, state-aware test setup, API CRUD validation, and CI-ready reporting across multiple browsers.

## 🏗 Architecture & Tech Stack

- **Core Framework:** Playwright (TypeScript)
- **Design Pattern:** Strict Page Object Model (POM)
- **Continuous Integration:** GitHub Actions (Headless execution)
- **Target Applications:** ParaBank (Financial UI) & ReqRes (REST API)

## 🧪 Key Testing Strategies Demonstrated

### 1. Deterministic Ledger Assertions

Standard UI tests often trust frontend success messages. This suite captures initial account balances, executes a transfer, and mathematically asserts the exact amount is deducted from the sender and added to the receiver.

### 2. State-Aware Test Setup

Tests are resilient to missing UI state. If a required condition is missing (e.g., only one account exists), the test creates the missing state through the UI and continues.

### 3. Network Interception & Mocking

Demonstrates the ability to intercept network traffic using Playwright's `page.route()`, allowing for the simulation of edge cases, server errors, or specific payload responses without waiting for backend deployments.

### 4. API CRUD Validation

Full integration with REST APIs to validate structural integrity, response codes, and data persistence across `POST`, `GET`, `PUT`, and `DELETE` requests.

### 5. Secure Environment Management

Isolation of sensitive test data. Vault credentials and base URLs are managed strictly via `.env` files locally and securely injected via GitHub Secrets during CI pipeline execution.

---

## ⚙️ Continuous Integration (CI)

This project is fully integrated with **GitHub Actions**. Upon every push or pull request to the main branch, the pipeline:

1. Provisions an Ubuntu runner.
2. Injects secure environment variables via GitHub Secrets.
3. Installs precise dependency versions.
4. Executes the test suite in headless mode.
5. Uploads HTML diagnostic reports as artifacts if failures occur.

## 🚀 Getting Started Locally

### Prerequisites

- Node.js (v18 or higher)
- A `.env` file containing `BASE_URL`, `TEST_USER`, `TEST_PASS`, and `REQRES_API_KEY`

### Installation

```bash
npm install
npx playwright install
```

### Run Tests

npx playwright test

### View Report

npx playwright show-report

> Note: The ledger transfer test runs on Chromium only to avoid cross‑browser data collisions on the shared demo environment.
