import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { faker } from "@faker-js/faker";

export class CheckoutOverviewPage extends BasePage {
  readonly shoppingCartBadge = this.page.locator(
    "[data-test='shopping-cart-badge']"
  );
  readonly finishButton = this.page.locator("[id='finish']");

  constructor(page: Page) {
    super(page);
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
