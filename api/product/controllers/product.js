'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async () => {

    // return all collection of products
    return await strapi.query('product').model.fetchAll({
      withRelated: ["image"]
    });

  },
  findOne: async () => {
    const {id} = ctx.params;
    return await strapi.query('product').model.where({id: id}).fetch({
      withRelated: ["image"],
    });
  }

};
