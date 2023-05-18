export function getLogList(serialLogs, HEADER_TO_INDEX) {
    let list = [[], [], [], []];

    serialLogs.forEach(e => {
        list[HEADER_TO_INDEX[e.status]].push(e);
    });

    return list;
}

export function valueExist(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}