export class DashboardPage {

    constructor(page) {
        this.page = page;
        this.productsTiles = page.locator('app-card-list app-card');
        this.productsTexts = page.locator('.card-body a');
        this.btncheckout = page.locator('//a[contains(text(), "Checkout")]');
    }

    async goToCheckout(){
        await this.btncheckout.click();
        await this.page.waitForLoadState('networkidle')
    }

    async addProduct(productName){
        await this.productsTiles.filter({ hasText: productName }).getByRole('button',{name:'Add '}).click();
    }

}