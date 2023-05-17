export function moveTask(list, draggedTask, droppedLocation, KANBAN_HEADERS) {
    let task = list[draggedTask.columnId][draggedTask.taskId];
    list[draggedTask.columnId].splice(draggedTask.taskId, 1);

    if (droppedLocation.taskId === -1) {
        list[droppedLocation.columnId].push(task);
        task.status = KANBAN_HEADERS[droppedLocation.columnId];
    } else {
        list[droppedLocation.columnId].splice(droppedLocation.taskId + 1, 0, task);
        task.status = KANBAN_HEADERS[droppedLocation.columnId];
    }
    return list;
}

export function getLogList(serialLogs, HEADER_TO_INDEX) {
    let list = [[], [], [], []];

    serialLogs.forEach(e => {
        list[HEADER_TO_INDEX[e.status]].push(e);
    });

    return list;
}