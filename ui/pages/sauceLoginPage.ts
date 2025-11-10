import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SauceLoginPage extends BasePage {
  private readonly usernameInput = this.page.locator("[id='user-name']");
  private readonly passwordInput = this.page.locator("[id='password']");
  private readonly loginButton = this.page.locator("[id='login-button']");
  readonly invalidLoginError = this.page.locator(
    ".error-message-container.error"
  );

  constructor(page: Page) {
    super(page);
  }

  async sauceLogin(
    username: string,
    password: string,
    url: string
  ): Promise<void> {
    await this.page.goto(url);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
