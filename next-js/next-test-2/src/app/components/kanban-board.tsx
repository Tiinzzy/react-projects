import { TaskType, ArrayOfObjects } from './kanban-types';

const NAME_2_INDEX: { [key: string]: number; } = { 'back-log': 0, 'to-do': 1, 'in-progress': 2, 'completed': 3 };
const INDEX_2_NAME: { [key: number]: string; } = { 0: 'back-log', 1: 'to-do', 2: 'in-progress', 3: 'completed' };
const HEADER_TO_INDEX: { [key: string]: number; } = { 'Backlog': 0, 'To Do': 1, 'In Progress': 2, 'Completed': 3 };


export const getData = (): TaskType[] => {
    return [
        {
            id: 10,
            status: 'to-do',
            title: 'Fixing the css issue in order page'
        },
        {
            id: 12,
            status: 'back-log',
            title: 'Moving the project to next js'
        },
        {
            id: 15,
            status: 'in-progress',
            title: 'Fixing the drag and drop issue'
        },
        {
            id: 16,
            status: 'in-progress',
            title: 'New user interface documentation'
        }
    ]
}

export const getBoardData = (data: TaskType[]): TaskType[][] => {
    let boardData: TaskType[][] = [[], [], [], []];

    for (let e in data) {
        let colIndex = NAME_2_INDEX[data[e].status]
        boardData[colIndex].push(data[e]);
    };

    return boardData;
}

export const updateBoard = (data: TaskType[][], taskPosition: { colIndex: number, rowIndex: number }, toColumnIndex: number): TaskType[][] => {
    data = [...data];
    let task = data[taskPosition.colIndex][taskPosition.rowIndex];
    task.status = INDEX_2_NAME[toColumnIndex];
    data[toColumnIndex].push(task);
    data[taskPosition.colIndex].splice(taskPosition.rowIndex, 1);
    return data;
}

export function getLogList(serialLogs: Array<object>): object {
    let list: ArrayOfObjects = [[], [], [], []];
    
    serialLogs.forEach(e => {
        list[HEADER_TO_INDEX[e.status]].push(e);
    });

    return list;
}