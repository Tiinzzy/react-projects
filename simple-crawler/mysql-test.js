const express = require('express')
const app = express()

const CostsDatabase = require('./CostsDatabase.js');
const costDb = CostsDatabase.INSTANCE();

app.get('/all', async function (req, res) {
    let rows = await costDb.selectAllRows();
    res.send(rows);
});

app.get('/by-date', async function (req, res) {
    let rows = await costDb.selectRowsByDate(req.query.date);
    res.send(rows);
});

main();

// ------------------------------------------------------------------------------------------------
async function runApplication() {
    console.log("This is our application, connection works OK!");
    app.listen(3000);
}

// ------------------------------------------------------------------------------------------------
function existsWithError(msg) {
    console.log(msg);
}

// ------------------------------------------------------------------------------------------------
async function main() {
    let connectionOk = await costDb.connectionOK();
    if (connectionOk) {
        runApplication();
    } else {
        existsWithError("Sorry can not connect to database!");
    }
}
