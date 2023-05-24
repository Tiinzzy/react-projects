export type KanbanBoardProps = {
    boardData: Array<{ [key: string]: string }>
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

export type ArrayOfObjects = [Array<{ [key: string]: string }>, Array<{ [key: string]: string }>, Array<{ [key: string]: string }>, Array<{ [key: string]: string }>];
