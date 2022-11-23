import axios from "axios";

const csv = require('csvtojson')

export async function getDataFromPublic() {
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

export async function getData() {
    return axios.get('/get-all-data', { params: {} })
        .then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return null;
        });
}

export function getColumns(row) {
    var columns = [];

    for (var c in row) {
        columns.push({ field: c, headerName: c, width: 300 });
    }

    return columns;
}

export async function saveCsv(data) {
    console.log(data);
    return axios.post('/save-csv', {}, { params: { data: data } })
        .then(response => {
            if (response.status === 200) {
                return response.data.success;
            } else {
                return false;
            }
        })
        .catch(error => {
            return false;
        });
}

export async function editData(query) {
    return axios.post('/edit-data', {}, { params: { query: query } })
        .then(response => {
            if (response.status === 200) {
                return response.data.success;
            } else {
                return false;
            }
        })
        .catch(error => {
            return false;
        });
}