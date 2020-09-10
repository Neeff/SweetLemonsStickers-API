'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    init: async (ctx) => {
        const { shoppingCart } = ctx.request.body;
        ctx.send({ shoppingCart });
    },

    response: async (ctx) => {
        ctx.send({
            status: "here"
        })

    },

    finish: async (ctx) => {

    }

};
