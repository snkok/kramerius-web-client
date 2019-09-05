var proxyMiddleware = require('http-proxy-middleware');

module.exports = {
    server: {
        middleware: {
            1: proxyMiddleware('/search', {
                target: 'http://onk.snk.tempest.test',
                changeOrigin: true   // for vhosted sites, changes host header to match to target's host
            }),
        }
    }
};
