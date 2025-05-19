export class APIUtils {


    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {//debe ser async ya que se usa el context
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {

            data: this.loginPayload
            /*/data: {
                userEmail: email,
                userPassword: password
            }*/
        });
        const jsonResponse = await loginResponse.json();
        const tokenlogin = jsonResponse.token;
        //console.log(jsonResponse);
        return tokenlogin;
    }

    async CreateOrder(orderPayload) {

        let response = {}//uso esta varible para guardar varias respuestas que me sirven retornar en el metodo
        response.token = await this.getToken();

        const buyOrderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'content-type': 'application/json'
            }
        });

        const jsonOrderResponse = await buyOrderResponse.json();
        response.orderIds = jsonOrderResponse.orders;
        //console.log(orderids);
        return response;
    }


}
//module.exports = { APIUtils } // para que sea visible para los otros files, se puede usar el export donde se declara la clase si vamos a exportar todo
