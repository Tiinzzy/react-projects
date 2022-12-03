import axios from "axios";

const csv = require('csvtojson')

export async function getDataFromPublic() {
    return axios('/some-costs.csv').then(result => {
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
    var defaultColumns = [];

    for (var c in row) {
        let col = { field: c, headerName: c, width: (c === 'DESC' ? 500 : 100) };
        if (col.field === 'AMOUNT') {
            col.type = 'number';
            col.align = 'right';
        }
        defaultColumns.push(col);
    }

    let columns = [];
    defaultColumns.forEach(c => {
        if (c.field === 'id') {
            columns.unshift(c);
        } else {
            columns.push(c);
        }
    });

    return columns;
}

export async function saveCsv(data) {
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

export function getGridHeight() {
    let height = window.innerHeight - 180;
    if (height < 100) {
        height = 100;
    }
    return height;
}

export function getGridWidth() {
    let width = window.innerWidth - 40;
    if (width < 20) {
        width = 20;
    }
    return width;
}