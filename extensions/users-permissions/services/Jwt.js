'use strict'
const _ = require('lodash');

module.exports = {
    setJwtInCookie: (ctx, token) => {
        ctx.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
            domain: process.env.NODE_ENV === "development" ? "localhost" : process.env.PRODUCTION_URL,
        });
    },
}
