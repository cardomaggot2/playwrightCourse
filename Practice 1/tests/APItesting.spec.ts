import { expect, test } from '@playwright/test';

const email = "test12344@tester.com"
const password = "Test1234"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dataPayload = { userEmail: email, userPassword: password  }

test('API 1', { tag: '@APITest' }, async ({ request }) => {
    const loginResponse = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {

        //data: dataPayload
        data: {
            userEmail: email,
            userPassword: password
        }
    });
    expect(loginResponse.ok()).toBeTruthy();

    const jsonResponse = await loginResponse.json();
    const tokenlogin = jsonResponse.token;
    console.log(tokenlogin);


});