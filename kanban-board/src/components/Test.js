import React, { useState, useRef } from 'react';

const KANBAN_HEADERS = ['Backlog', 'To Do', 'In Progress', 'Completed'];

const Test = () => {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
        console.log('drag started')
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
        console.log('as dragging')
    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        console.log(copyListItems,'1')
        copyListItems.splice(dragItem.current, 1);
        console.log(copyListItems,'2')
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        console.log(copyListItems,'3')
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
        console.log('drag finished and dropped')
    };

    return (
        <>
            <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={1}>
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
                                width='25%'>{item}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {/* {
                list &&
                list.map((item, index) => (
                    <div style={{ backgroundColor: 'lightblue', margin: '20px 25%', textAlign: 'center', fontSize: '40px' }}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        key={index}
                        draggable>
                        {item}
                    </div>
                ))} */}
        </>
    );
};
export default Test;