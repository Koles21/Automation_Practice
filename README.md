Playwright Automation Framework

This repository contains an end-to-end test automation framework built with Playwright and TypeScript, covering both UI testing for SauceLab and API testing for Regres within a single project.
Writting both UI and API tests within the same project is used rather than in separate ones, mainly because of easier maintenance.

Project Overview

The goal of this setup is to have both UI and API tests in one unified framework, ensuring full test coverage from frontend to backend.

UI tests validate user interactions, page navigation, and element visibility.

API tests validate backend responses, endpoints, and data consistency.

Tech Stack

Language: TypeScript

Framework: Playwright

Reporting: Allure Report

Assertions: Playwright Test built-in expect library

Environment management: .env.dev

Package Manager: npm Setup & Run
1. Install dependencies
npm install

2. Run API tests
npm run api:dev

3. Run UI tests for Standard user
npm run ui:dev:chrome:standardUser

4. Run UI tests for Locked user
npm run ui:dev:chrome:lockedUser

5. Run UI tests for Problem user
npm run ui:dev:chrome:problemUser

Allure Reports

1. Open the report
npm run allure-report

Notes

Requires Node.js v16+

Requires Java v21+

Environment variables are configured in .env.dev

Playwright automatically handles browser installation on the first run

npx playwright install

Reports and screenshots are stored in allure-results and test-results

API Results in Allure report:
<img width="942" height="449" alt="image" src="https://github.com/user-attachments/assets/7a8d3600-f830-48b0-94b9-d36fe12e1118" />

UI Results for Standard User in Allure report: 
<img width="851" height="310" alt="image" src="https://github.com/user-attachments/assets/eeffa391-2280-4e69-8d6d-f0f5e9e37c54" />

UI Results for Locked out User in Allure report: 
<img width="820" height="316" alt="image" src="https://github.com/user-attachments/assets/a3906691-9b32-4f12-9d67-780562a7e12f" />

UI Results for Problem User in Allure report:
<img width="1567" height="560" alt="image" src="https://github.com/user-attachments/assets/5562e858-8fc1-4335-b481-5c2af58848b7" />




