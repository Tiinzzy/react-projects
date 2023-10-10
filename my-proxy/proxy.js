const { Client } = require('undici');

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 8090;
const HOST = "localhost";

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

const dbProxy = createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true
});

const bankProxy = createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true
});

app.use('/backend/bank', bankProxy);
app.use('/backend/db', dbProxy);


app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
