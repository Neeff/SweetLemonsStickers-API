'use strict'
module.exports = {
    refreshToken: async (ctx) => {
        // ctx.request contiene el body enviado desde el cliente
        // ctx.response, envia una respuesta al cliente
        const { token } = ctx.request.body;
        const payload = await strapi.plugins['users-permissions'].services.jwt.verify(token);
        return strapi.plugins['users-permissions'].services.jwt.issue({
            id: payload.id
        });
    }
}
