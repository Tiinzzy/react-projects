import React, { useState, useRef } from 'react';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import BacklogDialog from './BacklogDialog';
import './style.css';

const KANBAN_HEADERS = ['Backlog', 'To Do', 'In Progress', 'Completed'];
const SAMPLE = [
    [{ title: 'test1', description: 'some description', status: 'Backlog', priority: 'Low' }, { title: 'test11', description: 'some description', status: 'Backlog', priority: 'Low' }],
    [{ title: 'test2', description: 'some description', status: 'To Do', priority: 'Low' }],
    [{ title: 'test3', description: 'some description', status: 'In Progress', priority: 'Low' }],
    [{ title: 'test4', description: 'some description', status: 'Completed', priority: 'Low' }]];


const draggedTask = {};
const droppedLocation = {}

export default function KanbanTable() {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(SAMPLE);
    const [openDialog, setOpenDialog] = useState(false);


    const dragStart = (e, columnId, taskId) => {
        draggedTask.columnId = columnId;
        draggedTask.taskId = taskId;
        dragItem.current = columnId;
        console.log('draggedTask', draggedTask);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        droppedLocation.columnId = position;
        console.log('droppedLocation', droppedLocation)
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
        console.log(draggedTask, ' ==> ', droppedLocation);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = (query) => {
        if (query && query.title === KANBAN_HEADERS[0]) {
        } else if (query && query.title === KANBAN_HEADERS[1]) {
        }
        else if (query && query.title === KANBAN_HEADERS[2]) {
        }
        else if (query && query.title === KANBAN_HEADERS[3]) {
        } else {
            setOpenDialog(false);
        }
        setOpenDialog(false);
    }

    return (
        <>
            <div style={{ width: 1400 }}>
                <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5, border: 'solid 1px #eaeaea', borderRadius: 4 }} cellPadding={0} cellSpacing={1}>
                    <tbody>
                        <tr>
                            {KANBAN_HEADERS.map((j, k) => (
                                <th key={k} width='25%'>{j}
                                    {j === 'Backlog' ?
                                        <span style={{ marginLeft: 10 }}>
                                            <IconButton onClick={handleOpenDialog}>
                                                <ControlPointIcon />
                                            </IconButton>
                                        </span>
                                        :
                                        <span></span>}
                                </th>
                            ))}
                        </tr>
                        <tr valign='top'>
                            {list && list.map((item, index) => (
                                <td key={index}
                                    width='25%'>{item.map((e, i) => (
                                        <div style={{ border: 'solid 1px black', display: 'flex', flexDirection: 'column', padding: 10, borderRadius: 4, marginBottom:10 }}
                                            draggable
                                            onDragStart={(e) => dragStart(e, index, i)}
                                            onDragEnter={(e) => dragEnter(e, index)}
                                            onDragEnd={drop}
                                            key={i}>
                                            <span>
                                                <span style={{ fontWeight: 'bold', marginRight: 10 }}>
                                                    Title:
                                                </span>
                                                {e.title}
                                            </span>
                                            <span>
                                                <span style={{ fontWeight: 'bold', marginRight: 10 }}>
                                                    Description:
                                                </span>
                                                {e.description}
                                            </span>
                                            <span>
                                                <span style={{ fontWeight: 'bold', marginRight: 10 }}>
                                                    Status:
                                                </span>
                                                {e.status}
                                            </span>
                                            <span>
                                                <span style={{ fontWeight: 'bold', marginRight: 10 }}>
                                                    Priority:
                                                </span>
                                                {e.priority}
                                            </span>
                                        </div>
                                    ))}
                                </td>
                            ))}
                        </tr>

                    </tbody>
                </table>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <BacklogDialog handleCloseDialog={handleCloseDialog} />
            </Dialog>
        </>
    );
};