import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useFilePicker } from 'use-file-picker';

import { saveCsv } from './functions';

const csv = require('csvtojson')

export default function FilePicker() {
    const [csvD, setCsvD] = useState(null);
    const [openFileSelector, { filesContent }] = useFilePicker({
        accept: '.CSV',
    });

    async function convertToCsv(content) {
        let csvData = await csv().fromString(content);
        let id = 1;
        let data = {};

        csvData.forEach(row => {
            row.id = id++;
            row.category = 'None';
            data[row.id] = row;
        })

        //console.log(data);
        // console.log(Object.values(data));
        // console.log(Object.keys(data));

        // Todo tomorrow
        // 1) write a function that returns number of rows stored in the backend!?
        // 2) if the number of the rows are not zero ask user would you like to replace the alreadly stored data 
        // 3) if user says yes to 2) or the backend data is nothing save the data to the backend as it IS WORKING NOW
        setCsvD(csvData);
    }

    function processContent(content) {
        convertToCsv(content);
        return null;
    }

    async function handleSave() {
        console.log(csvD);
        return await saveCsv(csvD);
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