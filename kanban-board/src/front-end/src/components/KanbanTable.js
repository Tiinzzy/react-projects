import React, { useState, useEffect } from 'react';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import BacklogDialog from './BacklogDialog';
import CommenDialog from './CommenDialog';
import { moveTask, getLogList } from './functions';

import './style.css';

const HEADER_TO_INDEX = { 'Backlog': 0, 'To Do': 1, 'In Progress': 2, 'Completed': 3 };
const KANBAN_HEADERS = Object.keys(HEADER_TO_INDEX)
const draggedTask = {};
const droppedLocation = {}

export default function KanbanTable(props) {
    const [list, setList] = useState(getLogList(props.logs, HEADER_TO_INDEX));
    const [openDialog, setOpenDialog] = useState(false);
    const [displayComponent, setDisplayComponent] = useState(false);


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
        setList(moveTask([...list], draggedTask, droppedLocation, KANBAN_HEADERS));
        draggedTask.columnId = -1;
        draggedTask.taskId = -1;
        droppedLocation.columnId = -1;

    };

    const handleOpenDialog = () => {
        setDisplayComponent(false);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    function makeComment() {
        setDisplayComponent(true);
        setOpenDialog(true);
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
                                            onDoubleClick={() => makeComment()}
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
                {displayComponent === false ? <BacklogDialog handleCloseDialog={handleCloseDialog} />
                    : <CommenDialog handleCloseDialog={handleCloseDialog}/>}
            </Dialog>
        </>
    );
};