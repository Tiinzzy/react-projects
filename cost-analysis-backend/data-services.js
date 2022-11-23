const JSONdb = require('simple-json-db');
const db = new JSONdb('./data.json');


exports.saveCsv = (req) => {
    let data = req.query.data;
    console.log(data);
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

exports.editData = (req) => {
    let query = req.query.query;

    var id = query.id;
    var date = query.date;
    var desc = query.desc;
    var amont = query.amont;
    var category = query.category;


    if (typeof category === "string") {
        db.JSON(id, {
            id: id,
            date: date,
            desc: desc,
            amont: amont,
            category: category
        });
        db.sync();
        return { success: true }
    } else {
        return { success: false }
    }
}

