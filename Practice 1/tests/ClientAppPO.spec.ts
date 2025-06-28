import { expect } from "@playwright/test";
import { test as CATest } from "../fixtures/ClientAppPOFixture";

//const ClientAppPOTest = mergeTests(ClientAppPOFixture);

CATest.beforeEach("Open start URL and setting login locators", async () => {
  console.log(`Running ${CATest.info().title}`);
});

CATest.describe("My test Scenarios", () => {
  CATest(
    "E2E Test for Client Application APP",
    { tag: "@E2E" },
    async ({ clientAppPOFixture }) => {
      const result = await clientAppPOFixture.PurchasingProduct();

      expect(result).toBeTruthy();
    }
  );
});
