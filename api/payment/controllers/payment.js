'use strict';

module.exports = {

    init: async (ctx) => {
        const { id } = ctx.state.user;
        const { shoppingCart, amount } = ctx.request.body;
        const sessionId = id;
        const buyOrder = strapi.services.payment.createUUID();
        const returnUrl = 'http://localhost:1337/payments/response';
        const finalUrl = 'http://localhost:1337/payments/finish';
        const transaction = strapi.services.payment.Webpay();
        try {
            const response = await transaction.initTransaction(amount, buyOrder, sessionId, returnUrl, finalUrl);
            if (response) {
                const { token, url } = response
                // instancia y alamacena los elementos del carrito de compra que el usuario comprara
                const orderIds = await strapi.services.order.insertOrders(shoppingCart, id, buyOrder);
                await strapi.services.payment.createPayment(id, orderIds, buyOrder, amount);
                ctx.send({
                    token,
                    url
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
        const { token_ws } = ctx.request.body;
        try {
            const transactionResult = await transaction.getTransactionResult(token_ws);
            const { responseCode } = transactionResult.detailOutput[0];
            const { urlRedirection } = transactionResult;
            if (responseCode === 0) {
                // La transacción se ha realizado correctamente
                // actualiza la instancia de pago anteriormente creada en init
                strapi.services.payment.updatePayment(transactionResult);
                ctx.status = 307;
                ctx.redirect(urlRedirection);
                ctx.body = {
                    "token_ws": token_ws
                }
            } else {
                //destuir la instancia de payment y junto con ella las ordenes asociadas

            }
            console.log(transactionResult);

        } catch (error) {
            console.log(error);
        }
    },

    finish: async (ctx) => {
        let status = null;
        const { TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA, token_ws } = ctx.request.body;
        const transaction = strapi.services.payment.Webpay();

        if (TBK_TOKEN !== undefined) {
            status = 'ABORTED';
        }
        if (token_ws !== undefined) {
            const transactionResult = await transaction.getTransactionResult(token_ws);
            const { responseCode } = transactionResult.detailOutput[0];
            console.log(transactionResult);
            if (responseCode === 0) {
                status = 'AUTHORIZE';
            } else {
                status = 'REJECTED';
            }
        }
        if (status === null) {
            ctx.status = 307
            ctx.redirect('') // redireccionar a la url 404 del front
            ctx.body = { error: 'Page Not Found' }
        }
        if (TBK_TOKEN === undefined && TBK_ID_SESION !== undefined, TBK_ORDEN_COMPRA !== undefined) {
            status = 'more than ten minutes passed, transaction rejected';
        }
        if (TBK_TOKEN !== undefined && token_ws !== undefined) {
            status = 'Payment ABORTED';
        }
        //ctx.status = 307;
        //ctx.redirect('');//redireccionar a la url que muestra el estado del pago en el front
        //ctx.body = {
        //status
        //};
        ctx.send({
            status
        });
    },

    find: async () => {
        return await strapi.query('payment').model.fetchAll({
            withRelated: ['orders']
        });
    }

};
