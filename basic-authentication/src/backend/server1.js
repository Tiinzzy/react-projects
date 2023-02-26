// THIS IS STUPID AUTHENTICATION MODEL !!!!

const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth')

const PORT = process.env.PORT || 5000;
const USERS = { 'admin': 'admin', 'tina': 'tina' };

function myAuthorizer(username, password) {
    console.log(username, password);
    if (USERS[username] && USERS[username] == password) {
        return true;
    } else {
        return false;
    }
}

app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
}));

app.get("/secret", (req, res) => {
    const result = { message: 'you need to go out with your friend later ...' };
    res.json(result);
});

app.get("/", (req, res) => {
    const result = { message: 'this is public information, enjoy !' };
    res.json(result);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


