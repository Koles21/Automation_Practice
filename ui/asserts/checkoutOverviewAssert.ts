import { expect } from "@playwright/test";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";
import { el } from "@faker-js/faker";

export class CheckoutOverviewAssert {
  checkoutOverviewPage!: CheckoutOverviewPage;

  static async checkoutCartAssert(
    checkoutOverviewPage: CheckoutOverviewPage,
    expectedCount: string
  ) {
    if (await checkoutOverviewPage.shoppingCartBadge.isVisible()) {
      expect(await checkoutOverviewPage.shoppingCartBadge.innerText()).toBe(
        expectedCount
      );
    } else {
      throw new Error("Shopping cart badge is not visible");
    }
  }
}
