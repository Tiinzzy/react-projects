import axios from "axios";

const csv = require('csvtojson')
const DAY_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

export function stringWordsEqual(s1, s2, wordCount = 2) {
    let cleanS1 = s1.toLowerCase().split(' ').filter(e => e !== '');
    let cleanS2 = s2.toLowerCase().split(' ').filter(e => e !== '');

    if (cleanS1.length < wordCount || cleanS2.length < wordCount) {
        return false;
    }

    for (let i = 0; i < wordCount; i++) {
        if (cleanS1[i] !== cleanS2[i]) {
            return false;
        }
    }

    return true;
}

export async function setCategory(query) {
    return axios.post('/set-category', {}, { params: { query: query } })
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

export function getDailyAmount(data) {
    let dateSet = new Set(data.map(e => e.DATE));
    let dailyAmount = [...dateSet].map(e => { return { Date: e, AMOUNT: getDailySummary(data, e) } });
    return dailyAmount;
}

function getDailySummary(data, d) {
    let dateSummary = data.filter(e => e.DATE === d).map(e => e.AMOUNT * 1).reduce((a, b) => (a + b), 0);
    return dateSummary;
}

export function getWeekDaysAmount(data) {
    return [0, 1, 2, 3, 4, 5, 6].map(wdId => { return { Date: DAY_OF_WEEK[wdId], AMOUNT: getWeekDaySummary(data, wdId) } });
}

function getWeekDaySummary(data, wdId) {
    return data.filter(d => string2Date(d.DATE).getDay() === wdId).map(e => e.AMOUNT * 1).reduce((a, b) => (a + b), 0);
}

function string2Date(dateStr) {
    let parts = dateStr.split('-');
    let d = new Date();
    d.setYear(parts[0] * 1);
    d.setMonth(parts[1] * 1 - 1);
    d.setDate(parts[2] * 1);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    return d;
}