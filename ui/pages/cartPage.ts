import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  readonly removeProductButton = this.page.locator(
    "//button[contains(@id, 'remove-sauce')]"
  );
  readonly checkoutButton = this.page.locator("[id='checkout']");

  constructor(page: Page) {
    super(page);
  }

  async removeThirdProductFromCart(): Promise<void> {
    const thirdProduct = await this.removeProductButton.nth(2).innerText();
    await this.removeProductButton.nth(2).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
