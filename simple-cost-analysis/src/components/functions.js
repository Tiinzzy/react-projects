import axios from "axios";

const csv = require('csvtojson')

export async function getData() {
    return axios('http://localhost:3000/some-costs.csv').then(result => {
        if (result.status === 200) {
            return csv().fromString(result.data)
                .then((jCsv) => {
                    return jCsv;
                });
        } else {
            return null;
        }
    });
}

export function getColumns(row) {
    var columns = [];

    for (var c in row) {
        columns.push({ field: c, headerName: c, width: 300 });
    }
    
    return columns;
}