var express = require('express')

var session = require('express-session')

var bodyParser = require('body-parser');

const departmentsServices = require("./departments-services.js");

const PORT = process.env.PORT || 8888;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy',)

app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);

    app.get("/data/select-all-departments", (req, res) => {
        console.log('select all departments');
        res.json(departmentsServices.selectAllDepartments(req));
    })

    app.get("/data/get-all-department-products", (req, res) => {
        res.json(departmentsServices.getDepartmentProducst(req));
    })

    app.get("/data/submit-users-order", (req, res) => {
        res.json(departmentsServices.orderSubmit(req));
    })
});


