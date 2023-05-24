export type KanbanBoardProps = {
    title: string,
    paragraph: string,
    boardData: BoardType
}

export type StateInfoType = {
    index: number,
    color: string,
    name: string
}

export type TaskType = {
    id: number,
    status: string,
    title: string
}

export type TaskColumnType = Array<{ [key: string]: string }>;
export let emptyTaskColumnType: TaskColumnType = [];

export type BoardType = [TaskColumnType, TaskColumnType, TaskColumnType, TaskColumnType];
export let emptyBoard: BoardType = [emptyTaskColumnType, emptyTaskColumnType, emptyTaskColumnType, emptyTaskColumnType];