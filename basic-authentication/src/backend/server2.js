const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var md5 = require('md5');

const MySqlConnection = require('./MySqlConnection');
const connection = MySqlConnection.INSTANCE();

const PORT = process.env.PORT || 5000;

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'is-used-to-encrypt-info', resave: true, saveUninitialized: true }));

const EMAIL_USERNAME = 'reacttest40@gmail.com';
const EMAIL_PASSWORD = '789852@Qa';

const MYSQL = { host: 'localhost', user: 'dbadmin', password: 'washywashy', database: 'tests' };

function invalidateSession(req) {
    req.session.authorized = false;
    req.session.user = null;
}

function passwordResetRandomId() {
    const RANDOM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const RANDOM_LENGTH = RANDOM.length;
    let randomAssignment = '';
    for (let i = 0; i < 100; i++) {
        randomAssignment += RANDOM.charAt(Math.floor(Math.random() * RANDOM_LENGTH));
    }
    return randomAssignment;
}

function getDate() {
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    return utc
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

app.post('/check-email-to-see-user-exist', async (req, res) => {
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

app.post('/send-email-for-password-reset', async (req, res) => {
    let connectionStatus = await connection.connect(MYSQL);
    if (connectionStatus) {
        let email = req.body.email;
        let id = passwordResetRandomId();
        let date = getDate();
        let query = { email, date, id };
        let insertion = await connection.insertIntoResetPassword(query);
        if (insertion.rows.affectedRows === 1) {
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL_USERNAME,
                    pass: EMAIL_PASSWORD
                }
            });

            let mailDetails = {
                from: EMAIL_USERNAME,
                to: 'tina.vatanabadi@yahoo.com',
                subject: 'Test mail',
                text: 'Node.js testing mail for GeeksforGeeks'
            };

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log(err);
                    res.send({ result: 'Error occured, Something went wrong.' });
                } else {
                    res.send({ result: 'Reset password email sent successfully' });
                }
            });
        }
    }
});


app.post('/check-user-email-for-id', async (req, res) => {
    let connectionStatus = await connection.connect(MYSQL);
    if (connectionStatus) {
        let getEmail = await connection.emailForIdRedirect(req.body);
        if (getEmail.rows.length > 0) {
            res.send({ result: md5(getEmail.rows[0]), msg: 'correct email' })
        } else if (getEmail.rows.length === 0) {
            res.send({ msg: 'Something went wrogn' })
        }
    }
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));


// https://stackoverflow.com/questions/26196467/sending-email-via-node-js-using-nodemailer-is-not-working
// https://developers.google.com/gmail/api/quickstart/nodejs
// https://console.cloud.google.com/projectselector2/apis/dashboard?pli=1&supportedpurview=project