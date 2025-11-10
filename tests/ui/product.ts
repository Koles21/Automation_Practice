import test from "@playwright/test";
import { BasePage } from "../../ui/pages/basePage";
import { ProductsPage } from "../../ui/pages/productsPage";
import { SauceLoginPage } from "../../ui/pages/SauceLoginPage";
import { products } from "../../ui/constants/productsList";
import { CartPage } from "../../ui/pages/cartPage";
import { CheckoutPage } from "../../ui/pages/checkoutPage";
import { CheckoutAssert } from "../../ui/asserts/checkoutAssert";
import { BikeLightProductPage } from "../../ui/pages/bikeLightProductPage";
import { CartAssert } from "../../ui/asserts/cartAssert";
import { LoginAssert } from "../../ui/asserts/loginAssert";
import { ProductAssert } from "../../ui/asserts/productAssert";

test.describe("Product tests", () => {
  let productPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let bikeLightProductPage: BikeLightProductPage;
  let sauceLoginPage: SauceLoginPage;

  test.beforeEach(async ({ page }) => {
    const { sauceUsername, saucePassword } = test.info().project.metadata;
    const url = String(test.info().project.use.baseURL);
    sauceLoginPage = new SauceLoginPage(page);
    productPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    bikeLightProductPage = new BikeLightProductPage(page);

    await sauceLoginPage.sauceLogin(sauceUsername, saucePassword, url);
  });

  test("Standard User should be able to purchase a product", async () => {
    if (
      test.info().project.metadata.sauceUsername !==
      process.env.SAUCE_STANDARD_USERNAME
    ) {
      test.skip();
    }
    for (const product of products) {
      await productPage.addProductToCart(product);
    }
    await productPage.goToCart();
    await cartPage.removeThirdProductFromCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillYourInformation();
    await CheckoutAssert.checkoutAssert(checkoutPage);
    await checkoutPage.finishCheckout();
    await CheckoutAssert.finishShoppingAssert(checkoutPage);
  });

  test("Problem User should be able to add a product to cart", async () => {
    if (
      test.info().project.metadata.sauceUsername !==
      process.env.SAUCE_PROBLEM_USERNAME
    ) {
      test.skip();
    }

    const bikeLightProduct = await productPage.goToBikeLightProductDetails();
    await bikeLightProductPage.addBikeLightToCart();
    await productPage.goToCart();
    await CartAssert.cartAssert(cartPage, bikeLightProduct);
  });

  test("Standard User should be able to sort products by name", async () => {
    if (
      test.info().project.metadata.sauceUsername !==
      process.env.SAUCE_STANDARD_USERNAME
    ) {
      test.skip();
    }
    await productPage.sortProductsByNameAtoZ();
    await ProductAssert.productSortingAssert(productPage);
  });

  test("Locked Out User should not be able to login", async () => {
    if (
      test.info().project.metadata.sauceUsername !==
      process.env.SAUCE_LOCKED_USERNAME
    ) {
      test.skip();
    }
    await LoginAssert.invalidLoginAssert(sauceLoginPage);
  });
});
