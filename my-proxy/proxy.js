// TRY THESE =>>>   https://twm.me/how-to-run-your-react-application-on-a-subpath/
//                  https://plainenglish.io/blog/how-you-can-serve-react-js-build-folder-from-an-express-end-point-127e236e4d67

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const vhost = require('vhost');

const app = express();

const PORT = 8090;
const HOST = "localhost";

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

const dbProxy = createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    // pathRewrite: {
    //     '^/db': '',
    // },
});


const bankProxy = createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,
    // pathRewrite: {
    //     '^/bank': '',
    // },
});


app.use('/bank', bankProxy);
app.use('/db', dbProxy);


app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
