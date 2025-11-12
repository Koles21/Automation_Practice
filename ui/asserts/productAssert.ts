import { expect } from "@playwright/test";
import { ProductsPage } from "../pages/productsPage";
import { uiProductNamesSorted } from "../constants/productsList";

export class ProductAssert {
  productPage!: ProductsPage;

  static async productSortingAssert(productPage: ProductsPage) {
    const uiProductNames = await productPage.getAllProductNames();

    const normalizedUI = uiProductNames.map((n) =>
      n.toLowerCase().replace(/\s+/g, "-")
    );
    const expected = [...uiProductNamesSorted];

    expect(normalizedUI).toEqual(expected);
  }
}
