import axios from 'axios';

export async function getShopDepartments() {
    return axios.get('/data/select-all-departments', { params: {} })
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

export async function getTheDepartmentsPrducts(department) {
    let params = {};
    if (department) {
        params = { department: department }
    }
    return axios.get('/data/get-all-department-products', { params })
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

export function productColumns(row) {
    var columns = [];
    var maxCol = 10;
    let id = 1;

    for (var c in row) {
        if (maxCol > 0) {
            columns.push({ id: id, field: c, headerName: c, width: 200 });
            id += 1;
        }
    }
    return columns;
}

export async function submitOrder(query) {
    return axios.get('/data/submit-users-order', { params: { query: query } })
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

export async function getAllOrderLists() {
    return axios.get('/data/select-all-orders', { params: {} })
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

export function orderColumns(row) {
    var columns = [];
    var maxCol = 10;
    let id = 1;

    for (var c in row) {
        if (maxCol > 0) {
            columns.push({ id: id, field: c, headerName: capitalizeFirst(c), width: 200 });
            id += 1;
        }
    }
    return columns;
}

export function capitalizeFirst(str) {
    const words = str.split(' ');
    for (var w in words) {
        words[w] = words[w][0].toUpperCase() + words[w].substring(1);
    }
    return words.join(' ');
}

