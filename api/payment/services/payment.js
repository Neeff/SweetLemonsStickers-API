'use strict';
const Transbank = require('transbank-sdk');

module.exports = {
    createUUID: (ctx) => {
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

    }
};
