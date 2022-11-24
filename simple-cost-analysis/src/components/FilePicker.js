import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { DataGrid } from '@mui/x-data-grid';

import { useFilePicker } from 'use-file-picker';
import DisplayUploadGrid from './DisplayUploadGrid';

import { getColumns, saveCsv } from './functions';

const csv = require('csvtojson');

const gridStyle = {
    height: 700
}

export default function FilePicker() {
    const [jCsv, setJCsv] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState(null);
    const [gridColumns, setGridColumns] = useState([]);
    const [gridRows, setGridRows] = useState([]);
    const [openFileSelector, { filesContent }] = useFilePicker({
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
    }

    function processContent(content) {
        convertToCsv(content);
        return null;
    }

    async function handleSave() {
        console.log(jCsv);
        setOpenSnack(true);
        return await saveCsv(jCsv);
    }

    function handleCloseSnack() {
        setOpenSnack(false);
        setMessage(null);
    }

    return (<>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20, marginTop: 30, marginLeft: 20, alignItems: 'center' }}>
            Click to open CSV file
            <Box style={{ marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                <Button onClick={() => openFileSelector()} variant="outlined">Select CSV File </Button>
                <br />
                <span style={{ marginLeft: 30, paddingTop: 10, fontWeight: 'bold' }}>File Name:</span>
                {filesContent.map((file, i) => (
                    <Box key={i} style={{ marginLeft: 20, paddingTop: 10 }}>{processContent(file.content)}
                        {file.name}
                    </Box>))}
            </Box>
        </Box>
        <br />

        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20, marginLeft: 20, alignItems: 'center' }}>
            Would you like to save the files?
            <Box style={{ marginLeft: 20, display: 'inline-block' }}>
                <Button onClick={() => handleSave()} variant="outlined">Save File</Button>
            </Box>
        </Box>


        {jCsv && <DisplayUploadGrid jCsv={jCsv} />}

        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            open={openSnack}
            autoHideDuration={2000}
            onClose={() => handleCloseSnack()}>

            <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', textAlign: 'center', fontWeight: 'bold' }}
                message='File Saved Sucessfully' />
        </Snackbar>
    </>
    );
}