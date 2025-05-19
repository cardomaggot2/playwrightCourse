import { expect } from '@playwright/test';

export class PurchasePage {

    constructor(page) {
        this.page = page;
        this.countryTextbox = page.locator('#country');
        this.chkTerms = page.locator('#checkbox2').locator('..');//se hizo asi ya que el label que tiene el for#id esta estorbando
        this.confirmBtn = page.locator('form input[value]');
        this.successMsg = page.locator('div.alert-success');

    }

    async fillCountry(countryname) {
        await this.countryTextbox.fill(countryname);
    }

    async acceptConditions() {
        await this.chkTerms.click();
        //await page.locator('#checkbox2').first().check({force:true}); -- no recomendable usar, solo como ultima opcion -> Quick and easy solution. At the same time, you remove the "stability fuse" from your script! Framework is not helping you anymore, it's just doing what you are told to do.
    }

    async confirmPurchase() {
        await this.confirmBtn.click();
        await this.page.waitForLoadState('networkidle')
    }

    async validatePurchase() {
        await expect(this.successMsg).toBeVisible();
    }
}