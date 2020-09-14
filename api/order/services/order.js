'use strict';


module.exports = {

    insertOrders: async (shoppingCart, user_id, buyOrder) => {
        const orders = shoppingCart.map(order => ({
            quantity: order.quantity,
            price: order.price,
            finish: order.finish,
            size: order.size,
            user: user_id,
            product: order.product,
            buy_order: buyOrder
        }));
        // inserta multiples elementos y retorna las ids para generar la asociacion entre pago y orden
        try {
            const collection = await strapi.query('order').model.collection(orders)
                .invokeThen('save', null, { method: 'insert' });
            const ids = collection.map(model => model.attributes.id);
            return ids;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
}
