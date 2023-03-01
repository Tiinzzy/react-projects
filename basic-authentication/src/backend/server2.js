const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
var md5 = require('md5');

const MYSQL = { host: 'localhost', user: 'dbadmin', password: 'washywashy', database: 'tests' };

const MySqlConnection = require('./MySqlConnection');
const connection = MySqlConnection.INSTANCE();

const PORT = process.env.PORT || 5000;

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'is-used-to-encrypt-info', resave: true, saveUninitialized: true }))

// function isValidUser(user, password) {
//     return (user === 'tina' && password === md5('tina123'))
// }

app.post("/login", async (req, res) => {
    // let authorized = isValidUser(req.body.user, req.body.password);
    let connectionStatus = await connection.connect(MYSQL);
    if (connectionStatus) {
        let checkPassword = await connection.checkUserIsValid(req.body)
        let pass = checkPassword.rows;
        let authorized = pass[0].password === req.body.password;
        if (authorized) {
            req.session.authorized = authorized;
            req.session.user = req.body.user;
            res.send({ authorized });
        } else {
            res.send({ authorized });
        }
    } else {
        res.send({ error: 'Sorry something went wrong!' });
    }
});

app.post("/login-status", (req, res) => {
    let authorized = req.session.authorized;
    let user = req.session.user || '';
    res.send({ authorized, user });
});

app.post("/logout", (req, res) => {
    req.session.authorized = false;
    req.session.user = null;
    let authorized = false;
    res.send({ authorized });
});

app.post("/secret", (req, res) => {
    let result = { authorized: false };
    if (req.session.authorized) {
        let user = req.session.user
        result = { message: 'This is a protected data, you need to login already!', user, authorized: true };
    }
    res.json(result);
});

app.post('/get-connection-status', async (req, res) => {
    let connectionStatus = await connection.connect(MYSQL);
    res.send({ connectionStatus })
});

app.post('/sign-up-new-user', async (req, res) => {
    let connectionStatus = await connection.connect(MYSQL);
    if (connectionStatus) {
        let createUser = await connection.insertIntoMySql(req.body);
        res.send({ result: createUser.rows })
    } else {
        res.send({ error: 'Sorry something went wrong!' });
    }
});

app.post('/change_users_password', async (req, res) => {
    console.log(req.body)
    let connectionStatus = await connection.connect(MYSQL);
    if (connectionStatus) {
        res.send({ result: 'seccessful' })
    } else {
        res.send({ error: 'Sorry something went wrong!' });
    }
});



app.listen(PORT, () => console.log(`Listening on ${PORT}`));



/*

DO THESE SO CLEAN

1) /login => POST => real username & password login form
2) /logout => POST => logout
3) user validity should happen using a table in mysql table columns: (username, password, firstname, lastname, email)
4) for now we don't have signup or change password, we manually put some users in the table
5) if user is not login and access to website should go to /login
6) if user is logged in then /login or /  will go to /home
7) in /home for now just show firstname, lastname
8) you can connect mysql directly from node backend

*/