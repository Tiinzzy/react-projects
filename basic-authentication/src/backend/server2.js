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


function invalidateSession(req) {
    req.session.authorized = false;
    req.session.user = null;
}

app.post("/login", async (req, res) => {
    let connectionOk = await connection.connect(MYSQL);

    if (connectionOk) {
        let { rows } = await connection.checkUserIsValid(req.body);
        let authorized = false;
        if (rows.length > 0 && rows[0].password) {
            authorized = (rows[0].password === req.body.password);
            if (authorized) {
                req.session.authorized = authorized;
                req.session.user = req.body.user;
            } else {
                invalidateSession(req);
            }
        }
        res.send({ authorized });
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
    invalidateSession(req);
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
        if (createUser.rows.affectedRows === 1) {
            res.send({ result: createUser.rows });
        } else {
            res.send({ result: createUser.error })
        }

    } else {
        res.send({ error: 'Sorry something went wrong!' });
    }
});

app.post('/change-users-password', async (req, res) => {
    let connectionStatus = await connection.connect(MYSQL);
    let checkPassword = await connection.checkUserIsValid(req.body);
    let authorized = checkPassword.rows[0].password === req.body.password;
    if (connectionStatus && authorized) {
        let change = await connection.changeUsersPasswordInDatabase(req.body);
        res.send({ result: 'seccessful', change: change.rows })
    } else {
        res.send({ result: 'Sorry something went wrong!', change: null });
    }
});

app.post('/send-email-to-see-user-exist', async (req, res) => {
    let connectionStatus = await connection.connect(MYSQL);
    let emailExist = await connection.checkEmailExist(req.body);
    if (connectionStatus) {
        if (emailExist.rows.length > 0) {
            res.send({ result: emailExist.rows });
        } else if (emailExist.rows.length === 0) {
            res.send({ result: emailExist.rows });
        }
    }
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
