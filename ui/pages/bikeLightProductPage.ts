import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class BikeLightProductPage extends BasePage {
  readonly addToCartButton = this.page.locator(
    ".btn.btn_primary.btn_small.btn_inventory"
  );

  constructor(page: Page) {
    super(page);
  }

  async addBikeLightToCart(): Promise<void> {
    const isVisible = await this.addToCartButton.isVisible();
    const isEnabled = await this.addToCartButton.isEnabled();

    console.log(isVisible, isEnabled);

    if (!isVisible && !isEnabled) {
      throw new Error("Add to Cart button is not available");
    }

    try {
      await this.addToCartButton.click();
    } catch (error) {
      throw new Error("Failed to click Add to Cart button: " + error);
    }
  }
}
