import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Dialog from "@mui/material/Dialog";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import Save from './Save';

import { useFilePicker } from 'use-file-picker';

const csv = require('csvtojson');

const headerStyle = {
    cursor: 'pointer',
    color: '#1c4966',
    TextDecoder: 'none'
}

export default function FilePicker(props) {
    const [jCsv, setJCsv] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [gridRef,] = useState(React.createRef());
    const [showSaveMessage, setShowSaveMessage] = useState(false);

    const [openFileSelector, { filesContent, clear }] = useFilePicker({
        accept: '.CSV',
    });

    async function convertToCsv(content) {
        let csvData = await csv().fromString(content);
        let id = 1000;
        let data = {};

        let saveData = {};
        csvData.forEach(row => {
            row.id = id++;
            row.CATEGORY = 'None';
            data[row.id] = row;
            row.AMOUNT = (row.AMOUNT * 1).toFixed(2);
            saveData[row.id] = row;
        });

        setJCsv(saveData);

        if (gridRef.current !== null) {
            gridRef.current.refreshGrid(saveData);
        }

        clear();
        setDialogOpen(true)
    }

    function processContent(content) {
        convertToCsv(content);
        return null;
    }

    function handleCloseDialog() {
        setOpenSnack(true);
        setDialogOpen(false);
    }

    function handleCloseSnack() {
        setOpenSnack(false);
    }

    function saveCallBack(saved) {
        setShowSaveMessage(saved);
    }

    return (
        <>
            <Box>
                <Link variant="text" onClick={() => openFileSelector()} style={headerStyle}>Select File </Link>
                {filesContent.map((file, i) => (
                    <Box key={i} className='FilePickerFileName2 '>{processContent(file.content, i)}</Box>))}
            </Box>

            {dialogOpen && <Dialog onClose={() => handleCloseDialog()} open={dialogOpen} maxWidth="lg" fullWidth={true}>
                <Save jCsv={jCsv} handleCloseDialog={handleCloseDialog} callback={saveCallBack} />
            </Dialog>}

            {showSaveMessage && <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleCloseSnack}>
                <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', fontWeight: 'bold' }}
                    message={<div style={{ textAlign: 'center', width: 400 }}>File Saved Sucessfully</div>} />
            </Snackbar>}
        </>

    );
}