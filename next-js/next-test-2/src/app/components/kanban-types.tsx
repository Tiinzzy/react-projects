export type KanbanBoardProps = {
    title: string,
    paragraph: string,
    boardData: Array<object>
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

export type ArrayOfObjects = [Array<object>, Array<object>, Array<object>, Array<object>];
