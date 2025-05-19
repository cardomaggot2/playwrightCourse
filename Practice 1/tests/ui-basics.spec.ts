import { expect, test } from '@playwright/test';

const password = 'Test1234'

test.beforeEach('Open start URL and setting login locators', async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    
});
// Run all the tests in the file concurrently using parallel workers.
//test.describe.configure({ mode: 'parallel' });
test.describe.configure({ mode: 'serial' });
test('TC1 - Wrong credential', { annotation: { type: 'issue', description: 'issue#1' } }
    , async ({ browser }) => {//en este parametro se pasa la informacion del browser que se este ejecutando chrome,firefox,etc...

        //Crea una nueva instancia del browser sin cache/cookies, es como un tipo incognito
        const context = await browser.newContext(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo
        //Crea una nueva pagina donde vamos a navegar
        const page = await context.newPage(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        //const usernamelocator = page.getByLabel('Username:');
        const usernamelocator = page.getByTestId('username');
        const pwdlocator = page.locator('[type="password"]');
        const btnsignlocator = page.locator('#signInBtn');
        const errmsglocator = page.locator('//Strong[contains(text(), "Incorrect")]');
        const selectLoc = page.getByRole('combobox');
        const radio = page.locator('.radiotextsty');
        const terms = page.getByTestId('terms');


        await usernamelocator.fill('prueba');
        await pwdlocator.fill('contrasena');
        await radio.last().click();
        await page.getByTestId('okayBtn').click();
        await selectLoc.selectOption('Teacher');
        await terms.check();
        await terms.uncheck();
        await btnsignlocator.click();


        //console.log(await errmsglocator.textContent());
        await expect(errmsglocator).toContainText('Incorrect');
        await expect(radio.last()).toBeChecked();
        expect(await terms.isChecked()).toBeFalsy();//para validar que un check no este marcado
        //EL AWAIT SE PONE DENTRO DEL EXPECT SI LO QUE SE RETORNA EN EL METODO DEL LOCATOR ES UN TIPO PROMISE

        //Checkeando que tenga tal attributo
        await expect(page.getByRole('link', { name: 'Free Access to InterviewQues/' })).toHaveAttribute('class', 'blinkingText');

    });

test('TC2 - Login Successfully 1', { annotation: { type: 'issue', description: 'issue#1' } }
    , async ({ page }) => {//Si no se va a realizar ninguna configuracion en el parametro Browser entonces se puede usar el de page

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

test('TC3 - Register', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');

    let registerLoc = page.locator('//a[contains(text(), "Register here")]');
    //Registerpanel
    let regFirstnameLoc = page.getByTestId('firstName');
    let regLastnameLoc = page.getByTestId('lastName');
    let regEmailLoc = page.getByTestId('userEmail');
    let regPhoneLoc = page.getByTestId('userMobile');
    let regOccupLoc = page.locator('select[formcontrolname="occupation"]');
    let regGenderLoc = page.locator('input[value="Male"]');
    let regpassLoc = page.getByTestId('userPassword');
    let regconfirmpassLoc = page.getByTestId('confirmPassword');
    let rcheckLoc = page.locator('input[formcontrolname*="req"]');
    let rbtnregisterLoc = page.getByTestId('login');

    await registerLoc.click();

    await regFirstnameLoc.fill('nombre');
    await regLastnameLoc.fill('apellido');
    await regEmailLoc.fill('email2@emailtest.com');
    await regPhoneLoc.fill('1234567890');
    await regOccupLoc.selectOption('Student');//da un error en consola pero funciona, parece ser por Angular, una opcion para solucionarlo puede ser dar click y luego click en la opcion que se quiere
    await regGenderLoc.check();

    await regpassLoc.fill(password);
    await regconfirmpassLoc.fill(password);

    await rcheckLoc.check();
    await rbtnregisterLoc.click();

    //await expect(page.locator('//h1[contains(text(), "Account Created")]')).toContainText('Successfully');

})

test('TC4 - Login Succesful 2', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');

    //loginpanel
    let emailLoc = page.locator('form input[type="email"]');
    let passwordLoc = page.locator('form input[type="password"]');
    let btnLoginLoc = page.getByTestId('login');
    //MainPage
    let arrayProductLoc = page.locator('div.card-body h5');


    await emailLoc.fill('test12344@tester.com');
    await passwordLoc.fill(password);

    await btnLoginLoc.click();

    //Esperando a que carge la pagina
    //await page.waitForLoadState('networkidle');//wait until there are no network connections for at least 500 ms
    await arrayProductLoc.first().waitFor();

    //assert
    expect(await arrayProductLoc.nth(0).textContent()).toContain('ADIDAS');
})

test('TC5 - Opening new tab 1', async ({ browser }) => {

    //Crea una nueva instancia del browser sin cache/cookies, es como un tipo incognito
    const context = await browser.newContext(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo
    //Crea una nueva pagina donde vamos a navegar
    const page1 = await context.newPage(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo
    // Start waiting for new page before clicking. Note no await.
    const pagePromise = context.waitForEvent('page');


    //PAGE 1
    await page1.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page1.getByRole('link', { name: 'Free Access to InterviewQues/' }).click()

    //PAGE2
    const page2 = await pagePromise;
    const text = await page2.locator('.im-para a').textContent();
    const email = text?.toString();

    //console.log(text);
    await page1.getByTestId('username').fill(text!);
    console.log(await page1.getByTestId('username').inputValue());
    expect(await page1.getByTestId('username').inputValue()).toContain(text!);
})

test('TC6 - Opening new tab 2', async ({ browser }) => {

    const context = await browser.newContext(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo
    const page1 = await context.newPage(); //Si pasamos el parametro page este paso se hace por default, se hace asi por si configuramos algo

    //PAGE 1
    await page1.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentlink = page1.getByRole('link', { name: 'Free Access to InterviewQues/' });

    //Esperamos que se abra una o mas paginas
    const [pagePromise] = await Promise.all([ //Seguira esperando Hasta que se ejecuten las condiciones dentro de las llaves
        context.waitForEvent('page'),
        documentlink.click()
    ])


    //PAGE2
    const text = await pagePromise.locator('.im-para a').textContent();
    const email = text?.toString();

    //console.log(text);
    await page1.getByTestId('username').fill(text!);
    console.log(await page1.getByTestId('username').inputValue());
    expect(await page1.getByTestId('username').inputValue()).toContain(text!);
})


test('TC7 - Handling Calendars', async ({ page }) => {

    const month = 10
    const day = '30'
    const year = '2026'

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    await page.locator('div .react-date-picker__calendar-button').click();
    await page.locator('button.react-calendar__navigation__label').click();
    await page.locator('button.react-calendar__navigation__label').click();
    await page.getByText(year).click();

    await page.locator('.react-calendar__year-view__months__month').nth(month-1).click();

    if(Number(day) < 7)
        await page.locator('button.react-calendar__month-view__days__day').filter({hasText: day}).first().click();
    if(Number(day)>20)
        await page.locator('button.react-calendar__month-view__days__day').filter({hasText: day}).last().click();

    const pickeddate = await page.locator('div input[type=date]').getAttribute('value')
    console.log('picked date ='+pickeddate);
    console.log('expected date='+year+'-'+month+'-'+day)
    expect(pickeddate === (year+'-'+month+'-'+day)?true:false).toBeTruthy();



});



test('TC8 - Handling Dialogs', async ({ page }) => {


    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const alertbtn = page.getByTestId('confirmbtn');


    await page.on('dialog', dialog => dialog.accept());
    await alertbtn.click();

});

test('TC9 - Handling Mouse Hover', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.getByTestId('mousehover').hover();

    await page.locator('div.mouse-hover-content').first().click();


});

test('TC10 - Handling Iframes', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    const IframeLoc = page.frameLocator('#courses-iframe');

    await IframeLoc.locator('li a[href*="lifetime"]:visible').click();

    
    await expect( IframeLoc.locator('div.text h2 span')).toHaveText('13,522');


});

test('TC11 - Taking a screenshot', { tag: '@UITest' }, async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await page.getByTestId('hide-textbox').click();
    await page.screenshot({path: './tests/utils/Screenshots/ScreenshotTest.png'})
    await page.getByTestId('show-textbox').click();
    //await page.getByTestId('displayed-text').screenshot({path: './tests/utils/Screenshots/ScreenshotElementTest.png'})
    await page.locator('table#product.table-display').screenshot({path: '../utils/Screenshots/ScreenshotElementTest.png'})

});

test('TC12 - Screenshot comparison', { tag: '@UITest' }, async ({ page }) => {
    
    await page.goto('https://www.rediff.com/');
    expect(await page.screenshot()).toMatchSnapshot('Screenshot.png');

});

test('TC13 - Getting CSS properties of an element',async ({page}) =>{
    await page.goto('https://playwright.dev/');
      await page.locator('.getStarted_Sjon').waitFor();
      const element = await page.locator('.getStarted_Sjon');
      const backgroundColor = await element.evaluate((el) => {
          return window.getComputedStyle(el).getPropertyValue('font-size');
      });

      console.log(backgroundColor);
  })

