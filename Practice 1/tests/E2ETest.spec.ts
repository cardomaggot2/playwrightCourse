import { expect, test } from '@playwright/test';

const email = 'test12344@tester.com'
const password = 'Test1234'
const itemname = 'qwerty'

test('E2E-1 - Buying a Product ', { tag: '@E2E' }, async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');

    //LOGINPAGE
    const emailLoc = page.locator('form input[type="email"]');
    const passwordLoc = page.locator('form input[type="password"]');
    const btnLoginLoc = page.getByTestId('login');
    await emailLoc.fill(email);
    await passwordLoc.fill(password);
    await btnLoginLoc.click();

    //HOMEPAGE
    //let arrayProductLoc = page.locator('div.card-body');//Tomamos todo el contenido incluyendo texto y botones
    //page.waitForLoadState('networkidle');
    //await arrayProductLoc.first().waitFor();//Esperando que cargue
    // let nProducts = await arrayProductLoc.count();

    // for (let i = 0; i < nProducts; i++) {
    //     if (await arrayProductLoc.nth(i).locator('b').textContent() == itemname) {
    //         //await arrayProductLoc.nth(i).locator('button.w-10').click();
    //         await arrayProductLoc.nth(i).locator('text=" Add To Cart"').click();
    //         break;
    //     }
    // }

    await page.locator('div.card-body').filter({ hasText: 'qwerty' }).getByRole('button',{name:' Add To Cart'}).click();



    //PAGINA DEL CARRITO
    const btnCart = page.locator('[routerlink="/dashboard/cart"]');
    await btnCart.click();

    // let arrayProductoCarritoLoc = page.locator('li.items');
    // await arrayProductoCarritoLoc.first().waitFor();//Esperamos ya que el count no tiene auto waiting
    // let np = await arrayProductoCarritoLoc.count();

    //Validando que el producto que elegimos este en el carrito
    //let isPresent = await page.locator('h3:has-text("'+itemname+'")').isVisible();
    //console.log(await page.locator('h3:has-text("'+itemname+'")').textContent());
    //expect(isPresent).toBeTruthy();

    expect(page.getByText('qwerty')).toHaveText(itemname);


    /*for (let i = 0; i < np; i++) {
        if (await arrayProductoCarritoLoc.nth(i).locator('h3').textContent() == itemname) {
            //await arrayProductLoc.nth(i).locator('button.w-10').click();
            await arrayProductoCarritoLoc.nth(i).locator('text="Buy Now"').click();
            break;
        }
    }*/

    await page.locator('li.items').filter({ hasText: itemname }).getByRole('button',{name: "Buy Now"}).click();


    // PAGINA DE PAYMENT METHOD

    //Checkeando que el Email sea el correcto
    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(email);


    //digitando el pais
    const CountryLoc = page.locator('div.user__address input');
    await CountryLoc.pressSequentially('ind') // Para meter un texto letra por letra

    const resultLoc = page.locator('.ta-results button');
    await resultLoc.first().waitFor();
    const nr = await resultLoc.count();

    for (let i = 0; i < nr; i++) {
        if (await resultLoc.nth(i).textContent() == ' India') {
            await resultLoc.nth(i).click();
            break;
        }
    }

    await page.locator('select.ddl').first().selectOption('10');
    await page.locator('select.ddl').last().selectOption('30');


    await page.getByText('Place Order').click();


    //PAGINA DE GRACIAS

    await expect(page.locator('td h1')).toContainText('Thankyou');
    console.log('OrderId:' + await page.locator('label.ng-star-inserted').textContent());
    

})