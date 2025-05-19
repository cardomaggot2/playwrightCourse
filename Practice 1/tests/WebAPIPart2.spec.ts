
//11 - SESSION STORAGE
import { test } from '@playwright/test';

let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo
    //Crea una nueva pagina donde vamos a navegar
    const page = await context.newPage(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('form input[type="email"]').fill('test12344@tester.com');;
    await page.locator('form input[type="password"]').fill('Test1234');
    await page.getByTestId('login').click();
    await page.locator('div.card-body h5').first().waitFor();

    //Guarda un snapshot de las cookies y el storage actual de la pagina en la ruta y archivo indicado
    await context.storageState({ path: '../utils/StorageSnapshots/state.json' })

    webContext = await browser.newContext({ storageState: '../utils/StorageSnapshots/state.json' })

});

//test.use({ storageState: './tests/utils/StorageSnapshots/state.json'});
test('TC1', { tag: '@APITest' }, async () => {//Si no se va a realizar ninguna configuracion en el parametro Browser entonces se puede usar el de page

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('button[routerlink*="myorders"]').click();

});

test('TC2', { tag: '@APITest' }, async () => {//Si no se va a realizar ninguna configuracion en el parametro Browser entonces se puede usar el de page

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('div.card-body').filter({ hasText: 'IPHONE 13 PRO' }).getByRole('button', { name: ' Add To Cart' }).click()
    page.locator('[routerlink="/dashboard/cart"]').click();
    page.locator('li.items').waitFor();
    await page.locator('li.items').filter({ hasText: 'IPHONE 13 PRO' }).getByRole('button', { name: "Buy Now" }).click();

});
