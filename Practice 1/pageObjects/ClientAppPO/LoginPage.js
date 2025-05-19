export class LoginPage {

    constructor(page) {

        this.page = page;
        this.username = page.getByTestId('username');
        this.password = page.locator('[type="password"]');
        this.btnSignIn = page.locator('#signInBtn');

    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(usr, pass) {

        await this.username.fill(usr);
        await this.password.fill(pass);
        await this.btnSignIn.click();
        //Esperando a que carge la pagina
        await this.page.waitForLoadState('networkidle');//This method waits for the page to reach a specific load state, such as "load", "domcontentloaded", or "networkidle"
        //await this.page.waitForNavigation();//This method is specifically used to wait for the page to navigate to a new URL or reload
    }
}