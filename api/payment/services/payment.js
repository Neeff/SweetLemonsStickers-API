'use strict';
const Transbank = require('transbank-sdk');

module.exports = {
    createUUID: () => {
        let dt = new Date().getTime();
        let uuid = 'xxxxx-xxxx-4xxx-yxxx-xxxxx'.replace(/[xy]/g, c => {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    Webpay: () => {
        const transaction = new Transbank
            .Webpay(Transbank.Configuration
                .forTestingWebpayPlusNormal())
            .getNormalTransaction();
        return transaction;

    },

    createPayment: async (userId, orderIds, buyOrder, amount, tbkToken) => {
        const payment = await strapi.query('payment').create({
            user: userId,
            orders: orderIds,
            amount: amount,
            buy_order: buyOrder,
            tbk_token: tbkToken
        });
        return payment;

    },

    updatePayment: async (response) => {
        const { buyOrder, cardDetail, detailOutput, transactionDate, VCI } = response;
        const { responseCode, paymentTypeCode, authorizationCode, commerceCode } = detailOutput[0];
        const payment = await strapi.query('payment').update({
            buy_order: buyOrder
        }, {
            verified: true,
            response_code: responseCode,
            pay_date: transactionDate,
            payment_method: paymentTypeCode,
            authorization_code: authorizationCode,
            commerce_code: commerceCode,
            vci: VCI,
            card_number: cardDetail.cardNumber,
        });
        return payment;
    },
    isVerified: async (tbkToken) => {
        const payment = await strapi.query('payment').model.where('tbk_token', tbkToken).fetch();
        const { verified } = payment.attributes
        if (verified === null) return false;
        if (verified === false) return false;
        if (verified === true) return true;
    },

    returnByToken: async (tbkToken) => {
        const payment = await strapi.query('payment').model.where('tbk_token', tbkToken).fetch({
            columns: ['pay_date', 'buy_order', 'amount']
        });
        return payment;


    }
};
