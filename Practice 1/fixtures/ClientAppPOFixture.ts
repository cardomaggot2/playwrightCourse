import { test as baseTest, Page } from "@playwright/test";
import { POManager } from "../pageObjects/ClientAppPO/POManager";
import jsondata from "../utils/testData/ClientAppTestData.json";

class ClientAppPOFixture {
  readonly page: Page;
  readonly poManager: POManager;
  

  constructor(page) {
    this.page = page;
    this.poManager = new POManager(this.page);
  }

  /**
   * Fills the form.
   *
   * @returns {Promise<boolean>}
   */
  async PurchasingProduct(): Promise<boolean> {
    try {
      for (const data of jsondata) {
        //const testData = JSON.parse(authcred);
        //const poManager = new POManager(page);
        console.log('Checking - ' + data.authcred.productName);
        const username = data.authcred.username;
        const password = data.authcred.password;
        const productName = data.authcred.productName;
        const country = data.country;

        //LoginPage
        console.log('Login Page');
        const loginPage = this.poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.login(username, password);

        //DashboardPage
        console.log('Dashboard Page');
        const dashboardPage = this.poManager.getDashboardPage();
        await dashboardPage.addProduct(productName);
        await dashboardPage.goToCheckout();

        //ProductDetails Page
        console.log('Product Details Page');
        const productDetailsPage = this.poManager.getProductDetailsPage();
        await productDetailsPage.validateAddedProduct(productName);
        await productDetailsPage.gotoPurchase();

        //Purchase Page
        console.log('Purchase Page');
        const purchasePage = this.poManager.getPurchasePage();
        await purchasePage.fillCountry(country);
        await purchasePage.acceptConditions();
        await purchasePage.confirmPurchase();
        await purchasePage.validatePurchase();
        console.log(data.authcred.productName+' -> Purchased successfully');
      }
      return true;
    } catch (error) {
      console.error(
        "Error in RequestABrochureFixture requestABrochureFormFieldsValidation",
        error
      );
      return false;
    }
  }
}
// export const CAtest = test.extend({
//   ClientAppPOFixture : async ({ page }, use) => {
//     const clientAppPOFixture = new ClientAppPOFixture(page);
//     await use(clientAppPOFixture);
//   },
// });

type MyFixtures = {
  clientAppPOFixture: ClientAppPOFixture
}
export const test = baseTest.extend<MyFixtures>({
clientAppPOFixture: async ({ page }, use) => {
  const clientAppPOFixture = new ClientAppPOFixture(page);
  await use(clientAppPOFixture);
},
});
