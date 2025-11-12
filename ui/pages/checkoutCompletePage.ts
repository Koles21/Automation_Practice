import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { faker } from "@faker-js/faker";

export class CheckoutCompletePage extends BasePage {
  readonly orderConfirmationText = this.page.locator(".complete-header");
  readonly dispatchConfirmationText = this.page.locator(".complete-text");

  constructor(page: Page) {
    super(page);
  }
}
