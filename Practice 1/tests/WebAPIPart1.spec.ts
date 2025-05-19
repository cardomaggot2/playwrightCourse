
//10 - STORAGE USING API
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

test('Searching an order', { tag: '@APITest' }, async ({ page }) => {

    //Setting the login token to be able to navigate without login page
     page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('button[routerlink*="myorders"]').click();

    await page.locator('table.table-bordered tbody tr').filter({ hasText: response.orderIds[0] }).getByRole('button', { name: 'View' }).click();

    await expect(page.locator('div.-main')).toHaveText(response.orderIds[0]);
});



