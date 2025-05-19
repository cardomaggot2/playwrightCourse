export class authCred {
    
    constructor() {
        this.email = 'test12344@tester.com' //test1234456@tester.com
        this.password = 'Test1234'
        this.loginPayload = { userEmail: this.email, userPassword: this.password }
        this.orderPayload = {
            "orders": [
                {
                    "country": "Costa Rica",
                    "productOrderedId": "6581cade9fd99c85e8ee7ff5"
                },
                {
                    "country": "Costa Rica",
                    "productOrderedId": "6701364cae2afd4c0b90113c"
                }
            ]
        }
    }
}

