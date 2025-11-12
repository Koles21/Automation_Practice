import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { th } from "@faker-js/faker";

export class ProductsPage extends BasePage {
  readonly productOption = (product: string) =>
    this.page.locator(`[id='add-to-cart-sauce-labs-${product}']`);

  readonly redTShirtOption = this.page.locator(
    "[id='add-to-cart-test.allthethings()-t-shirt-(red)']"
  );

  readonly shoppingCartButton = this.page.locator(
    "[data-test='shopping-cart-link']"
  );

  readonly bikeLightProduct = this.page.locator(
    "//div[text()='Sauce Labs Bike Light']"
  );

  readonly sortDropdown = this.page.locator(".product_sort_container");

  constructor(page: Page) {
    super(page);
  }

  async addProductToCart(product: string): Promise<void> {
    if (product === "t-shirt-red") {
      await this.redTShirtOption.click();
    } else {
      await this.productOption(product).click();
    }
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartButton.click();
  }

  async goToBikeLightProductDetails(): Promise<void> {
    await this.bikeLightProduct.click();
  }

  async sortProductsByNameAtoZ(): Promise<void> {
    await this.sortDropdown.selectOption("az");
  }

  async getAllProductNames(): Promise<string[]> {
    const count = await this.allProducts.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await this.allProducts.nth(i).innerText();
      names.push(name.trim());
    }
    return names;
  }
}
