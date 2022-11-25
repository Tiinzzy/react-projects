import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import { useFilePicker } from 'use-file-picker';
import DisplayUploadGrid from './DisplayUploadGrid';
import DisplayGrid from './DisplayGrid';
import SaveUpload from './SaveUpload';

import './style.css';

const csv = require('csvtojson');

export default function FilePicker() {
    const [jCsv, setJCsv] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [gridRef, setGridRef] = useState(React.createRef());

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
    }

    function processContent(content) {
        convertToCsv(content);
        return null;
    }

    async function handleSave() {
        setDialogOpen(true);
    }

    function handleCloseDialog() {
        setOpenSnack(true);
        setDialogOpen(false);
    }

    function handleCloseSnack() {
        setOpenSnack(false);
    }

    return (<>
        <Box className='FilePickerButtonBoxes'>
            Click to open CSV file
            <Box className='FilePickerButtonBoxes2'>
                <Button onClick={() => openFileSelector()} variant="outlined">Select CSV File </Button>
                <br />
                <span className='FilePickerFileName'>File Name:</span>
                {filesContent.map((file, i) => (
                    <Box key={i} className='FilePickerFileName2 '>{processContent(file.content, i)}</Box>))}
            </Box>
        </Box>

        <br />

        <Box className='FilePickerSaveTex'>
            Would you like to save the files?
            <Box className='FilePickerSaveButton'>
                <Button onClick={() => handleSave()} variant="outlined">Save File</Button>
            </Box>
        </Box>

        <Box className='FilePickerGridMainBox'>
            <Box width={jCsv ? '50%' : '100%'} className="FilePickerOldData"> Previous Data <DisplayGrid /></Box>
            {jCsv && <Box className="FilePickerNewData"> Uploaded Data  <DisplayUploadGrid ref={gridRef} jCsv={jCsv} /> </Box>}
        </Box>

        {dialogOpen && <Dialog onClose={() => handleCloseDialog()} open={dialogOpen} maxWidth='sm' fullWidth={true}>
            <SaveUpload jCsv={jCsv} handleCloseDialog={handleCloseDialog} />
        </Dialog>}

        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            open={openSnack}
            autoHideDuration={2000}
            onClose={handleCloseSnack}>

            <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                message='File Saved Sucessfully' />
        </Snackbar>

    </>
    );
}