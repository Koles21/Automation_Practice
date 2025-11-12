import { expect } from "@playwright/test";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage";

export class CheckoutCompleteAssert {
  checkoutCompletePage!: CheckoutCompletePage;

  static async finishShoppingAssert(
    checkoutCompletePage: CheckoutCompletePage
  ) {
    expect(await checkoutCompletePage.orderConfirmationText.innerText()).toBe(
      "Thank you for your order!"
    );
    expect(
      await checkoutCompletePage.dispatchConfirmationText.innerText()
    ).toBe(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  }
}
