import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';

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

function moveTask(list, draggedTask, droppedLocation) {
    let task = list[draggedTask.columnId][draggedTask.taskId];
    list[draggedTask.columnId].splice(draggedTask.taskId, 1);
    if (droppedLocation.taskId === -1) {
        list[droppedLocation.columnId].push(task);
    } else {
        list[droppedLocation.columnId].splice(droppedLocation.taskId + 1, 0, task);
    }
    return list;
}

function checkContains(array, key, value, data) {
    const exists = SAMPLE.some(array => array.some(obj => obj[key] === value))
    if (!exists) {
        array.push(data);
    }
    return array;
}

export default function KanbanTable(props) {
    const [list, setList] = useState(SAMPLE);
    const [openDialog, setOpenDialog] = useState(false);

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        for (let i in props.logs) {
            if (props.logs[i].status === 'Backlog') {
                checkContains(SAMPLE[0], '-id', props.logs[i]._id, props.logs[i])
                // SAMPLE[0].push(props.logs[i]);

            } else if (props.logs[i].status === 'To Do') {
                checkContains(SAMPLE[1], '-id', props.logs[i]._id, props.logs[i])

                // SAMPLE[1].push(props.logs[i]);
            } else if (props.logs[i].status === 'In Progress') {
                checkContains(SAMPLE[2], '-id', props.logs[i]._id, props.logs[i])

                // SAMPLE[2].push(props.logs[i]);
            } else if (props.logs[i].status === 'Completed') {
                checkContains(SAMPLE[3], '-id', props.logs[i]._id, props.logs[i])

                // SAMPLE[3].push(props.logs[i]);
            }
        }
    });


    useEffect(() => {
        let uniqueArrays = [...new Set(list)];
        setList(uniqueArrays);
    }, []);



    const dragStart = (e, columnId, taskId) => {
        draggedTask.columnId = columnId;
        draggedTask.taskId = taskId;
    };

    const dragOver = (e, columnId, taskId) => {
        droppedLocation.columnId = columnId;
        if (list[columnId].length === 0) {
            droppedLocation.taskId = -1;
        } else if (taskId >= 0) {
            droppedLocation.taskId = taskId;
        }
    };

    const drop = (e) => {
        if (draggedTask.columnId === droppedLocation.columnId) {
            e.preventDefault();
            return;
        }
        setList(moveTask([...list], draggedTask, droppedLocation));
        draggedTask.columnId = -1;
        draggedTask.taskId = -1;
        droppedLocation.columnId = -1;
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <div style={{ width: 1400 }}>
                <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5, border: 'solid 1px #f7f7f7', borderRadius: 4 }} cellPadding={2} cellSpacing={2}>
                    <tbody>
                        <tr>
                            {KANBAN_HEADERS.map((j, k) => (
                                <th key={k} width='25%' >
                                    {j}
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
                                    onDragEnd={drop}
                                    onDragOver={(e) => dragOver(e, index, -1)}
                                    width='25%'>{item.map((e, i) => (
                                        <div style={{ backgroundColor: 'white', border: 'solid 1px rgb(54, 54, 54)', display: 'flex', flexDirection: 'column', padding: 10, borderRadius: 3, marginBottom: 10 }}
                                            draggable={true}
                                            onDragStart={(e) => dragStart(e, index, i)}
                                            onDragOver={(e) => dragOver(e, index, i)}
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