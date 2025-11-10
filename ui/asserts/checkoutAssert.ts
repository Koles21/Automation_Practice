import { expect } from "@playwright/test";
import { CheckoutPage } from "../pages/checkoutPage";

export class CheckoutAssert {
  checkoutPage!: CheckoutPage;

  static async checkoutAssert(checkoutPage: CheckoutPage) {
    expect(await checkoutPage.shoppingCartBadge.innerText()).toBe("5");
  }

  static async finishShoppingAssert(checkoutPage: CheckoutPage) {
    expect(await checkoutPage.orderConfirmationText.innerText()).toBe(
      "Thank you for your order!"
    );
    expect(await checkoutPage.dispatchConfirmationText.innerText()).toBe(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  }
}
