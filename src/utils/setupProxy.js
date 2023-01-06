const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://192.168.102.242:8080/',
            target: 'http://localhost:8081/',
            // target: 'http://tims-web.com:9527',
            changeOrigin: true
        })
    );
}
