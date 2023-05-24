import { TaskType, ArrayOfObjects } from './kanban-types';
import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

const NAME_2_INDEX: { [key: string]: number; } = { 'Backlog': 0, 'To Do': 1, 'In Progress': 2, 'Completed': 3 };
const INDEX_2_NAME: { [key: number]: string; } = { 0: 'Backlog', 1: 'To Do', 2: 'In Progress', 3: 'Completed' };
const HEADER_TO_INDEX: { [key: string]: number; } = { 'Backlog': 0, 'To Do': 1, 'In Progress': 2, 'Completed': 3 };


export const getData = (): TaskType[] => {
    return [
        {
            id: 10,
            status: 'Backlog',
            title: 'Fixing the css issue in order page'
        },
        {
            id: 12,
            status: 'To Do',
            title: 'Moving the project to next js'
        },
        {
            id: 15,
            status: 'Completed',
            title: 'Fixing the drag and drop issue'
        },
        {
            id: 16,
            status: 'In Progress',
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

export const updateBoard = (data: ArrayOfObjects, taskPosition: { colIndex: number, rowIndex: number }, toColumnIndex: number): ArrayOfObjects => {
    data = [...data];
    let task = data[taskPosition.colIndex][taskPosition.rowIndex];
    task.status = INDEX_2_NAME[toColumnIndex];
    data[toColumnIndex].push(task);
    data[taskPosition.colIndex].splice(taskPosition.rowIndex, 1);
    backend.update_document_mongo_db({ documents: data });
    return data;
}

export function getLogList(serialLogs: Array<{ [key: string]: string }>): object {
    let list: ArrayOfObjects = [[], [], [], []];
    serialLogs.forEach(e => {
        list[HEADER_TO_INDEX[e.status]].push(e);
    });

    return list;
}