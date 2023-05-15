import React, { useState, useRef } from 'react';
import './style.css';

const KANBAN_HEADERS = ['Backlog', 'To Do', 'In Progress', 'Completed'];

export default function KanbanTable() {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(position, 1)
        console.log(e.target.innerHTML, '<<');
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(position, 2)
        console.log(e.target.innerHTML, '<<');
    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
        e.preventDefault();
    };

    return (
        <div style={{ width: 1000, height: 1000 }}>
            <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5, border: 'solid 1px #eaeaea' }} cellPadding={0} cellSpacing={1}>
                <tbody>
                    <tr>
                        {KANBAN_HEADERS.map((j, k) => (
                            <th key={k} width='25%'>{j}</th>
                        ))}
                    </tr>
                    <tr>
                        {list && list.map((item, index) => (
                            <td key={index}
                                draggable
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                width='25%'>{item}
                                <div >
                                    123
                                </div>
                            </td>
                        ))}
                    </tr>

                </tbody>
            </table>
        </div>
    );
};