const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 8090;
const HOST = "localhost";

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

app.use(
    createProxyMiddleware({
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
            [`^/db`]: '',
            [`^/db/`]: '',
        }
    })
);

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
