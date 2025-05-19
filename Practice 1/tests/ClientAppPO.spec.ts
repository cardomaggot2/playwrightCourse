import { test, expect, mergeTests } from '@playwright/test';
import { CAtest as ClientAppPOFixture } from '../fixtures/ClientAppPOFixture'


const ClientAppPOTest = mergeTests(ClientAppPOFixture);


test.beforeEach('Open start URL and setting login locators', async () => {
    console.log(`Running ${test.info().title}`);

});

ClientAppPOTest('E2E Test for Client Application APP', { tag: '@E2E' }, async ({ ClientAppPOFixture }) => {

    const result = await ClientAppPOFixture.PurchasingProduct();

    expect(result).toBeTruthy();

})

