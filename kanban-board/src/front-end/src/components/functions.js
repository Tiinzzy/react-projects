export function getLogList(serialLogs, HEADER_TO_INDEX) {
    let list = [[], [], [], []];

    serialLogs.forEach(e => {
        list[HEADER_TO_INDEX[e.status]].push(e);
    });

    return list;
}

// TODO: fix variable names here and everywhere
export function valueExist(array, key, value) {
    // TODO: try to use more fuinctional things ...
    let result = array.filter(d => d[key] === value);
    return result.length > 0 ? result[0] : null;

    // for (let i = 0; i < array.length; i++) {
    //     if (array[i][key] === value) {
    //         return array[i];
    //     }
    // }
    // return null;
}