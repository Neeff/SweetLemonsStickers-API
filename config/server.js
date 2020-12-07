module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    return_url: env('RETURN_URL'),
    final_url: env('FINAL_URL'),
    admin: {
        auth: {
            secret: env('ADMIN_JWT_SECRET', 'd09f50dd5c6f8b640790fbd73da85d24'),
        },
    },
});
