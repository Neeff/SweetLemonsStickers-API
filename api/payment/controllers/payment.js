'use strict';

const Transbank = require('transbank-sdk');
module.exports = {

    init: async (ctx) => {
        // const {shoppingCart, ammount} = ctx.request.body;
        //ctx.send({shoppingCart});
        const amount = 10000;
        const sessionId = 'user_id';
        const buyOrder = strapi.services.payment.createUUID();
        const returnUrl = 'http://localhost:1337/payments/response';
        const finalUrl = 'http://localhost:1337/payments/finish';
        const transaction = strapi.services.payment.Webpay();
        try {
            const response = await transaction.initTransaction(amount, buyOrder, sessionId, returnUrl, finalUrl);
            if (response) {

                const { token, url } = response
                ctx.send({
                    token,
                    url,
                    amount
                });
            }
        } catch (error) {
            console.log(error);
            ctx.send({
                error
            });
        }
    },



    response: async (ctx) => {
        const transaction = strapi.services.payment.Webpay();
        const token = ctx.request.body.token_ws;
        try {
            const response = await transaction.getTransactionResult(token);
            const output = response.detailOutput[0];
            if (output.responseCode === 0) {
                // La transacción se ha realizado correctamente
                ctx.status = 307;
                ctx.redirect(response.urlRedirection);
                ctx.body = {
                    "token_ws": token
                }
            }
            //console.log(response)

        } catch (error) {
            console.log(error);
        }
    },

    finish: async (ctx) => {

    }

};
