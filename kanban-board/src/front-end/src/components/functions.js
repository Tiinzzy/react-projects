export function getLogList(serialLogs, HEADER_TO_INDEX) {
    let list = [[], [], [], []];

    serialLogs.forEach(e => {
        list[HEADER_TO_INDEX[e.status]].push(e);
    });

    return list;
}

export function valueExist(kanbanBoard, key, value) {
    let result = kanbanBoard.filter(d => d[key] === value);
    // console.log(result)
    // return result.length > 0 ? result[0] : null;
    return result;
}