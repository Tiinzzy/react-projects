// TRY THESE =>>>   https://twm.me/how-to-run-your-react-application-on-a-subpath/
//                  https://plainenglish.io/blog/how-you-can-serve-react-js-build-folder-from-an-express-end-point-127e236e4d67

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 8090;
const HOST = "localhost";

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

const server1Proxy = createProxyMiddleware('/db', {
    target: "http://localhost:3000",
    changeOrigin: true,
    pathRewrite: {
        '^/db': '',
    },
});

const server2Proxy = createProxyMiddleware('/bank', {
    target: "http://localhost:4000",
    changeOrigin: true,
    pathRewrite: {
        '^/bank': '',
    },
});

app.use(server1Proxy);
app.use(server2Proxy);
app.use(express.static('js'));

// const proxy1 = {
//     target: 'https://www.google.com',
//     changeOrigin: true
// }
// const proxy2 = {
//     target: 'https://www.stackoverflow.com',
//     changeOrigin: true,
// }
// app.use(
//     '/search',
//     createProxyMiddleware(proxy1)
// );


// app.use(
//     '/jobs',
//     createProxyMiddleware(proxy2)
// );


app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
