import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { faker } from "@faker-js/faker";

export class CheckoutInformationPage extends BasePage {
  readonly firstNameInput = this.page.locator("[id='first-name']");
  readonly lastNameInput = this.page.locator("[id='last-name']");
  readonly postalCodeInput = this.page.locator("[id='postal-code']");
  readonly continueButton = this.page.locator("[id='continue']");

  constructor(page: Page) {
    super(page);
  }

  async fillYourInformation(): Promise<void> {
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.postalCodeInput.fill(faker.location.zipCode());
    await this.continueButton.click();
  }
}
