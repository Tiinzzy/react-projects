import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useFilePicker } from 'use-file-picker';

import { saveCsv } from './functions';

const csv = require('csvtojson')

export default function FilePicker() {
    const [jCsv, setJCsv] = useState(null);
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
            row.AMOUNT = (row.AMOUNT*1).toFixed(2);
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
        return await saveCsv(jCsv);
    }

    return (<>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20, marginTop: 30, marginLeft: 20 }}>
            Would you like to save the files?
            <Box style={{ marginLeft: 20, display: 'inline-block' }}>
                <Button onClick={() => handleSave()} variant="contained">Save File</Button>
            </Box>
        </Box>
        <br />
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20, marginLeft: 20 }}>
            Click to open CSV file
            <Box style={{ marginLeft: 20, display: 'inline-block' }}>
                <Button onClick={() => openFileSelector()} variant="contained">Select CSV File </Button>
                <br />
                {filesContent.map((file, i) => (<span key={i}>{processContent(file.content)}</span>))}
            </Box>
        </Box>
    </>
    );
}