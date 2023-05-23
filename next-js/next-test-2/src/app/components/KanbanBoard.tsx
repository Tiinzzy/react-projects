"use client"

import React, { useState, useEffect } from 'react';

import './kanban-board.css'

import { getBoardData, getData, updateBoard } from './kanban-board';
import { KanbanBoardProps, StateInfoType, TaskType } from './kanban-types';

const STATES: { [key: string]: StateInfoType; } = {
    'back-log': { index: 0, color: 'red', name: 'Back Log' },
    'to-do': { index: 1, color: 'brown', name: 'To Do' },
    'in-progress': { index: 2, color: 'steelblue', name: 'In Progress' },
    'completed': { index: 3, color: 'green', name: 'Completed' }
}

const BOARD_DATA: TaskType[][] = getBoardData(getData());
const NULL_TASK_POSITION = { colIndex: -1, rowIndex: -1 };


export const KanbanBoard = ({ title, paragraph }: KanbanBoardProps) => {
    const [board, setBoard] = useState(BOARD_DATA);
    const [draggedItemPosition, setDraggedItemPosition] = useState(NULL_TASK_POSITION);
    const [droppedColumn, setDroppedColumn] = useState(-1);

    const dragStart = (colIndex: number, rowIndex: number): void => {
        setDraggedItemPosition({ colIndex, rowIndex });
    }

    const onDragOver = (colIndex: number, rowIndex: number): void => {
        setDroppedColumn(colIndex);
    }

    const onDragEnd = (): void => {
        const updatedBoard = updateBoard(board, draggedItemPosition, droppedColumn);
        setBoard(updatedBoard);
    }

    useEffect(() => {


    }, [board]);

    return (
        <div id='kanban-board'>
            <div className="title">{title}</div>
            <div className="paragraph">{paragraph}</div>
            <table>
                <tbody>
                    <tr>
                        {Object.keys(STATES).map((k, colIndex) => (
                            <th key={colIndex} onDragEnd={() => onDragEnd()} onDragOver={() => onDragOver(colIndex, -1)}>
                                {STATES[k].name}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {board.map((col, colIndex) => (
                            <td key={colIndex}
                                onDragOver={() => onDragOver(colIndex, -1)}
                                onDragEnd={() => onDragEnd()}
                            >
                                {col.map((task, rowIndex) => (
                                    <div id='task' key={rowIndex}
                                        draggable={true} onDragStart={() => dragStart(colIndex, rowIndex)}>
                                        {task.title}
                                    </div>
                                ))}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

