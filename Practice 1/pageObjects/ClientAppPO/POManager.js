import { DashboardPage } from './DashboardPage';
import { PurchasePage } from './PurchasePage';
import { LoginPage } from './LoginPage';
import { ProductDetailsPage } from './ProductDetailsPage';


export class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.purchasePage = new PurchasePage(page);
        this.productDetailsPage = new ProductDetailsPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getProductDetailsPage(){
        return this.productDetailsPage;
    }

    getPurchasePage(){
        return this.purchasePage;
    }

}