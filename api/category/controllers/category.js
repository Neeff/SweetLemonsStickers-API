'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // filtra los productos por categoria, investigar como pasar una matriz en caso de querer filtrar por mas
  filterProductsByCategory: async (ctx) => {
    const {id} = ctx.params
    return await strapi.query('category').model.where("id", id).fetch({
      withRelated: ["products.image"]
    });
  },

  find: async () => {
    return await strapi.query("category").model.fetchAll({
      withRelated: ["cover"]
    });
  }

};
