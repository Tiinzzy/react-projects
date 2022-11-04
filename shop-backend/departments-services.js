const JSONdb = require('simple-json-db');
const departmentsDb = new JSONdb('./data/departments-db.json');
const orderDb = new JSONdb('./data/submit-orders-db.json');

const validateProductCount = (quantity) => {
    return !isNaN(quantity * 1);
};

exports.selectAllDepartments = () => {
    let jDepartments = departmentsDb.JSON();
    let result = [];
    for (let d in jDepartments) {
        result.push(d);
    }
    return result;
}

exports.getDepartmentProducst = (req) => {
    let department = req.query.department;
    console.log(department)
    let jDepartments = departmentsDb.JSON();
    let result = [];
    if (jDepartments.hasOwnProperty(department)) {
        result = jDepartments[department];
    } else {
        for (let d in jDepartments) {
            for (let p in jDepartments[d]) {
                result.push(jDepartments[d][p])
            }
        }
    }

    return result;
}

exports.orderSubmit = (req) => {
    let query = req.query.query;
    console.log(1, query);

    // return { success: true }

    let setSubmitByDate = new Date().toLocaleString();

    var customerName = query.customerName;
    var customerAddress = query.customerAddress;
    var productName = query.productName;
    var quantity = query.quantity

    if (typeof customerName === "string" && typeof customerAddress === "string" && typeof productName === "string" && validateProductCount(quantity)) {
        orderDb.set(setSubmitByDate, {
            customerName: customerName,
            customerAddress: customerAddress,
            productName: productName,
            quantity: quantity
        })
        return { success: true }
    } else {
        return { success: false }
    }
}