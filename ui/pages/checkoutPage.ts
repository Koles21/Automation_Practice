import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { faker } from "@faker-js/faker";

export class CheckoutPage extends BasePage {
  readonly firstNameInput = this.page.locator("[id='first-name']");
  readonly lastNameInput = this.page.locator("[id='last-name']");
  readonly postalCodeInput = this.page.locator("[id='postal-code']");
  readonly continueButton = this.page.locator("[id='continue']");
  readonly shoppingCartBadge = this.page.locator(
    "[data-test='shopping-cart-badge']"
  );
  readonly finishButton = this.page.locator("[id='finish']");
  readonly orderConfirmationText = this.page.locator(".complete-header");
  readonly dispatchConfirmationText = this.page.locator(".complete-text");

  constructor(page: Page) {
    super(page);
  }

  async fillYourInformation(): Promise<void> {
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.postalCodeInput.fill(faker.location.zipCode());
    await this.continueButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
