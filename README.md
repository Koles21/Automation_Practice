Playwright Automation Framework

This repository contains an end-to-end test automation framework built with Playwright and TypeScript, covering both UI and API testing within a single project.

Project Overview

The goal of this setup is to have both UI and API tests in one unified framework, ensuring full test coverage from frontend to backend.

UI tests validate user interactions, page navigation, and element visibility.

API tests validate backend responses, endpoints, and data consistency.

By combining both test types, the framework ensures the system works as a whole — from request to visual confirmation.

Tech Stack

Language: TypeScript

Framework: Playwright

Reporting: Allure Report

Assertions: Playwright Test built-in expect library

Environment management: .env.dev

Package Manager: npm Setup & Run
1. Install dependencies
npm install

2. Run all tests
npx playwright test

3. Run only UI tests
npx playwright test tests/ui

4. Run only API tests
npx playwright test tests/api

5. Run tests in headed mode (see the browser)
npx playwright test --headed

6. Run a specific test file
npx playwright test tests/ui/product.ts

🧾 Allure Reports
1. Run tests and collect Allure results
npx playwright test --reporter=line,allure-playwright

2. Generate the Allure report
npx allure generate allure-results --clean -o allure-report

3. Open the report
npx allure open allure-report

🧠 Notes

Requires Node.js v16+

Environment variables are configured in .env.dev

Playwright automatically handles browser installation on the first run

npx playwright install


Reports and screenshots are stored in allure-results and test-results
