
//11 - NETWORK ROUTING
import { expect, request, test } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils';//Importando la clase de APIutils
import { authCred } from '../utils/authCred'

let response;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const auth = new authCred();
    const apiUtils = new APIUtils(apiContext, auth.loginPayload);//Para debugearlo agregar el script para ejecutar este test en el package .json, luego Cmd+P y bucar con > debug npm script
    // Precondition is create an order, and get the response and logintoken
    response = await apiUtils.CreateOrder(auth.orderPayload);
    //console.log(response)
});

test.describe.configure({ mode: 'serial' });
test('TC1 -> Order history empty', { tag: '@NetworkRouting' }, async ({ page }) => {

    //Setting the login token to be able to navigate without login page
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client')


    //Routing provides the capability to modify network requests that are made by a page.
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {

        const response = await route.fetch();

        const json = JSON.stringify({ "data": [], "message": "No Orders" })

        await route.fulfill({ response, json });

    });


    await page.locator('button[routerlink*="myorders"]').click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    await expect(page.locator('div div.ng-star-inserted')).toHaveText(' You have No Orders to show at this time. Please Visit Back Us ');


});


test('TC2 -> Trying to access forbidden order history',{ tag: '@NetworkRouting' }, async ({ page }) => {
    //Setting the login token to be able to navigate without login page
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);



    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('button[routerlink*="myorders"]').click();
    //Routing provides the capability to modify network requests that are made by a page.
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', async route => {

        // Id for and order id of another user -> 6790237be2b5443b1f2f6c69
        await route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6790237be2b5443b1f2f6c69' });
        //await route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67902a41e2b5'});
    });

    await page.locator('table.table-bordered tbody tr').filter({ hasText: response.orderIds[0] }).getByRole('button', { name: 'View' }).click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*')
    await expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order');

});

test('TC3 - Abort a Request', { tag: '@NetworkRouting', annotation: { type: 'Test', description: 'e.g. Aborting a CSS/Image request' } }, async ({ page }) => {//Si no se va a realizar ninguna configuracion en el parametro Browser entonces se puede usar el de page

    await page.route(/\.(png|jpeg|webp|gif)/, route => route.abort());//bloqueando imagenes
    //await page.route('**/*.css', route => route.abort());//bloqueando CSS

    page.on('request', request => console.log(request.url()));//Para mostrar en el log los request que se han hecho
    page.on('response', response => console.log(response.url(),response.status()));


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const usernamelocator = page.getByTestId('username');
    const pwdlocator = page.locator('[type="password"]');
    const btnsignlocator = page.locator('#signInBtn');
    const cardTileslocator = page.locator('.card-body a');

    await usernamelocator.fill('rahulshettyacademy');
    await pwdlocator.fill('learning');
    await btnsignlocator.click();

    //console.log(await cardTileslocator.first().textContent());// si tiene auto-wait
    console.log(await cardTileslocator.nth(1).textContent());// si tiene auto-wait
    const cardscontent = await cardTileslocator.allTextContents();//Este metodo no tiene autowaiting asi que va a fallar si la linea de arriba esta desactivada
    console.log(cardscontent);

});




