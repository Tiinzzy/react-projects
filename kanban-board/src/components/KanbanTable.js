import React, { useState, useRef } from 'react';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import BacklogDialog from './BacklogDialog';
import './style.css';

const KANBAN_HEADERS = ['Backlog', 'To Do', 'In Progress', 'Completed'];

export default function KanbanTable() {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState([['Item 1', 123], ['Item 2', 434], ['Item 3', 5453], ['Item 4', 675]]);
    const [openDialog, setOpenDialog] = useState(false);


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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <div style={{ width: 1400 }}>
                <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5, border: 'solid 1px #eaeaea' }} cellPadding={0} cellSpacing={1}>
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
                        <tr>
                            {list && list.map((item, index) => (
                                <td key={index}
                                    width='25%'>{item.map((e, i) => (
                                        <div draggable
                                            onDragStart={(e) => dragStart(e, index)}
                                            onDragEnter={(e) => dragEnter(e, index)}
                                            onDragEnd={drop}
                                            key={i}>
                                            {e}
                                        </div>
                                    ))}
                                </td>
                            ))}
                        </tr>

                    </tbody>
                </table>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <BacklogDialog handleCloseDialog={handleCloseDialog}/>
            </Dialog>
        </>
    );
};