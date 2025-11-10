import { expect } from "@playwright/test";
import { SauceLoginPage } from "../pages/SauceLoginPage";

export class LoginAssert {
  sauceLoginPage!: SauceLoginPage;

  static async invalidLoginAssert(sauceLoginPage: SauceLoginPage) {
    expect(await sauceLoginPage.invalidLoginError.innerText()).toBe(
      "Epic sadface: Sorry, this user has been locked out."
    );
  }
}
