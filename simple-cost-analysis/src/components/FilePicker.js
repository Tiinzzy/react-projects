import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import { useFilePicker } from 'use-file-picker';
import DisplayUploadGrid from './DisplayUploadGrid';
import DisplayGrid from './DisplayGrid';

import { saveCsv } from './functions';

const csv = require('csvtojson');

export default function FilePicker() {
    const [jCsv, setJCsv] = useState(null);
    const [openSnack, setOpenSnack] = useState(false);
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
        setOpenSnack(true);
        let result = await saveCsv(jCsv);
        return result
    }

    function handleCloseSnack() {
        setOpenSnack(false);
    }

    return (<>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20, marginTop: 30, marginLeft: 20, alignItems: 'center' }}>
            Click to open CSV file
            <Box style={{ marginLeft: 20, display: 'flex', flexDirection: 'row' }}>
                <Button onClick={() => openFileSelector()} variant="outlined">Select CSV File </Button>
                <br />
                <span style={{ marginLeft: 30, paddingTop: 10, fontWeight: 'bold' }}>File Name:</span>
                {filesContent.map((file, i) => (
                    <Box key={i} style={{ marginLeft: 20, paddingTop: 10 }}>{processContent(file.content, i)}</Box>))}
            </Box>
        </Box>

        <br />

        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20, marginLeft: 20, alignItems: 'center' }}>
            Would you like to save the files?
            <Box style={{ marginLeft: 20, display: 'inline-block' }}>
                <Button onClick={() => handleSave()} variant="outlined">Save File</Button>
            </Box>
        </Box>

        <Box style={{ width: '100%', display: 'flex', flexDirection: ' row', marginTop: 50 }}>
            <Box width={jCsv ? '50%' : '100%'} style={{
                display: 'flex', flexDirection: ' column', marginLeft: 20
            }}> Previous Data <DisplayGrid /></Box>
            {jCsv && <Box style={{ display: 'flex', flexDirection: ' column' }}> Uploaded Data  <DisplayUploadGrid ref={gridRef} jCsv={jCsv} /> </Box>}
        </Box>

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