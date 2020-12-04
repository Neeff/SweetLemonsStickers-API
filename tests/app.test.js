const fs = require('fs');
const { setupStrapi } = require('./helpers/strapi');
const data = require('./fakedata/data.js');

const { shoppingCart, amount, response } = data;
/** this code is called once before any test is called */
jest.setTimeout(15000)
beforeAll(async done => {
    await setupStrapi(); // singleton so it can be called many times
    done();
});

/** this code is called once before all the tested are finished */
afterAll(async done => {
    const dbSettings = strapi.config.get('database.connections.default.settings');

    //delete test database after all tests
    if (dbSettings && dbSettings.filename) {
        const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
        if (fs.existsSync(tmpDbFile)) {
            fs.unlinkSync(tmpDbFile);
        }
    }
    done();
});

it('strapi is defined', () => {
    expect(strapi).toBeDefined();
});

describe("services of orders", () => {
    it("func insertOrders", async () => {
        //console.log(data.shoppingCart);
        ordersId = await strapi.services.order.insertOrders(shoppingCart, 1, 'orderExampleUUID');
        expect(Array.isArray(ordersId)).toBe(true);
        expect(ordersId).toEqual([1, 2, 3]);
    });
});

describe("services of payments", () => {

    it('func createPayment', async () => {
        ordersIds = await strapi.services.order.insertOrders(shoppingCart, 1, 'orderExampleUUID');
        const payment = await strapi.services.payment.createPayment(1, ordersId, 'buyOrder', amount, 123);
        const basicStructPayment = {
            id: 1,
            pay_date: null,
            payment_method: null,
            response_code: null,
            buy_order: 'buyOrder',
            verified: null,
            amount: '10000',
            user: {},
            authorization_code: null,
            commerce_code: null,
            vci: null,
            card_number: null,
            tbk_token: '123',
            created_by: null,
            updated_by: null,
        }
        expect(payment).toEqual(expect.objectContaining(basicStructPayment));
    });

    it('func updatePayment', async () => {
        ordersIds = await strapi.services.order.insertOrders(shoppingCart, 1, 'orderExampleUUID');
        await strapi.services.payment.createPayment(1, ordersId, 'example', amount, 123);
        const updatedPayment = await strapi.services.payment.updatePayment(response);
        expect(updatedPayment).toEqual(expect.objectContaining({
            payment_method: '1',
            response_code: '1',
            buy_order: 'example',
            verified: true,
        }));


    });
});

