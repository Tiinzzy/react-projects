import React, { useState, useEffect } from 'react';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import BacklogDialog from './BacklogDialog';
import CommentDialog from './CommentDialog';
import { getLogList } from './functions';
import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();
const STATE_BACKGROUND_COLOR = { 'Backlog': '#c0392b30', 'To Do': '#e67e2230', 'In Progress': '#2980b930', 'Completed': '#27ae6030' };
const HEADER_TO_INDEX = { 'Backlog': 0, 'To Do': 1, 'In Progress': 2, 'Completed': 3 };
const KANBAN_HEADERS = Object.keys(HEADER_TO_INDEX);
const draggedTask = {};
const droppedLocation = {}

function moveTask(list, draggedTask, droppedLocation, KANBAN_HEADERS) {
    let task = list[draggedTask.columnId][draggedTask.taskId];
    list[draggedTask.columnId].splice(draggedTask.taskId, 1);
    let query = { document_id: task._id, documents: { 'description': task.description, 'priority': task.priority, 'title': task.title } };
    if (droppedLocation.taskId === -1) {
        list[droppedLocation.columnId].push(task);
        task.status = KANBAN_HEADERS[droppedLocation.columnId];
        query.documents['status'] = KANBAN_HEADERS[droppedLocation.columnId];
    } else {
        list[droppedLocation.columnId].splice(droppedLocation.taskId + 1, 0, task);
        task.status = KANBAN_HEADERS[droppedLocation.columnId];
        query.documents['status'] = KANBAN_HEADERS[droppedLocation.columnId];
    }
    backend.update_document_mongo_db(query, (data) => {
        if (data.result) {
            console.log('status changed!')
        }
    })
    return list;
}

export default function KanbanTable(props) {
    const [list, setList] = useState(getLogList(props.logs, HEADER_TO_INDEX));
    const [openDialog, setOpenDialog] = useState(false);
    const [displayComponent, setDisplayComponent] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');

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
        setList(moveTask([...list], draggedTask, droppedLocation, KANBAN_HEADERS));
        draggedTask.columnId = -1;
        draggedTask.taskId = -1;
        droppedLocation.columnId = -1;
    };

    const handleOpenDialog = () => {
        setDisplayComponent(false);
        setOpenDialog(true);
    }

    const handleCloseDialog = (query) => {
        if (query && query.action === 'reload') {
            backend.get_documents_from_mongo_db((data) => {
                setList(getLogList(data.documents, HEADER_TO_INDEX))
                if (data.documents.length > 0) {
                    setOpenDialog(false);
                }
            })
        } else {
            setOpenDialog(false);
        }
    }

    function makeComment(j, e) {
        setSelectedTask(e)
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
                                        <div style={{
                                            backgroundColor: STATE_BACKGROUND_COLOR[e.status],
                                            border: 'solid 2px ' + STATE_BACKGROUND_COLOR[e.status].substr(0, 7) + 'AA',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: 10,
                                            borderRadius: 3,
                                            marginBottom: 10
                                        }}
                                            draggable={true}
                                            onDoubleClick={(j) => makeComment(j, e._id)}
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
                    : <CommentDialog handleCloseDialog={handleCloseDialog} selectedTask={selectedTask} />}
            </Dialog>
        </>
    );
};