import { expect } from "@playwright/test";
import { CartPage } from "../pages/cartPage";
import { ProductsPage } from "../pages/productsPage";

export class CartAssert {
  cartPage!: CartPage;
  productPage!: ProductsPage;

  static async cartAssert(cartPage: CartPage, bikeLightProduct: string) {
    expect(await cartPage.allProducts.innerText()).toBe(bikeLightProduct);
  }
}
