# Financial Trading QA Automation

## Overview

A Playwright + TypeScript automation suite covering UI, API, and mocked UI flows against public demo systems. The focus is stable, cross-browser functional coverage with CI-ready reporting, aimed at demonstrating entry-level QA automation skills.

## Tech Stack

- Playwright Test (UI + API)
- TypeScript
- GitHub Actions CI
- HTML reporting with traces on retry

## Quick Start

- npm ci
- npx playwright install
- npx playwright test
- npx playwright show-report

## Environment Variables

- BASE_URL: base URL for the banking UI under test
- TEST_USER: login username
- TEST_PASS: login password
- REQRES_API_KEY: API key for the demo API

## Test Strategy (Summary)

- Goals: validate critical user flows, core API CRUD behavior, and UI response to mocked data.
- Scope: login success/error, transfer flow, balance visibility, API create/update/delete, UI mocking.
- Approach: page objects for UI, direct API requests for service checks, route mocking for deterministic UI.
- Reliability: cross-browser runs, retries in CI, trace captured on first retry.
- Test Data: credentials and API keys supplied via environment variables; no secrets in code.
- Out of Scope: performance, security, and exhaustive edge cases; focus on functional smoke/regression.

## Reporting & CI

- Local: HTML report is generated after runs; traces are available on retry.
- CI: tests run on every push and pull request; report artifacts are published.
