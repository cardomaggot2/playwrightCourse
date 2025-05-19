import { expect } from '@playwright/test';

export class ProductDetailsPage {

    constructor(page) {
        this.page = page;
        this.productTiles = page.locator('div.media');
        this.btnCheckout = page.locator('button.btn-success');

    }

    async validateAddedProduct(productName) {
        await expect(this.productTiles.filter({ hasText: productName }).locator('h4 a')).toContainText(productName);
    }

    async gotoPurchase() {
        await this.btnCheckout.click();
        //Esperando a que carge la pagina
        await this.page.waitForLoadState('networkidle');//This method waits for the page to reach a specific load state, such as "load", "domcontentloaded", or "networkidle"
        //await this.page.waitForNavigation();//This method is specifically used to wait for the page to navigate to a new URL or reload
    }
}