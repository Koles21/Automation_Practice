import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly allProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProducts = this.page.locator(".inventory_item_name");
  }

  // --- Navigation ---
  /**
   *
   * @param url - URL to navigate to
   */
  async navigateToSauce(): Promise<void> {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }
}
