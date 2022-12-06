const JSONdb = require('simple-json-db');
const db = new JSONdb('./data.json');


exports.saveCsv = (req) => {
    let data = req.query.data;
    if (typeof data === "object") {
        db.JSON(data);
        db.sync();
        return { success: true }
    } else {
        return { success: false }
    }
}

exports.getAllData = () => {
    let jData = db.JSON();
    let result = [];
    for (let r in jData) {
        result.push(jData[r]);
    }
    return result;
}

// exports.editData = (req) => {
//     let query = req.query.query;

//     var id = query.id;
//     var DATE = query.DATE;
//     var DESC = query.DESC;
//     var AMOUNT = query.AMOUNT;
//     var CATEGORY = query.CATEGORY;


//     if (typeof CATEGORY === "string" && CATEGORY !== 'None') {
//         db.set(id, { id, DATE, DESC, AMOUNT, CATEGORY });
//         return { success: true }
//     } else {
//         return { success: false }
//     }
// }

exports.setCategory = (req) => {
    let query = req.query.query;

    var ids = query.id;
    var category = query.CATEGORY;

    if (typeof ids === "string") {
        ids = [ids];
    }

    if (typeof category === 'string' && category !== 'None') {
        let jData = db.JSON();
        ids.map(e => jData[e]).forEach(e => {
            e.CATEGORY = category;
            db.set(e.id, e);
        });
        return { success: true }
    } else {
        return { success: false }
    }
}