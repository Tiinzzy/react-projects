import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { useFilePicker } from 'use-file-picker';

import { saveCsv } from './functions';


const csv = require('csvtojson')


const headerStyle = {
    cursor: 'pointer',
    color: '#1c4966'
}

export default function FilePicker() {
    const [openFileSelector, { filesContent }] = useFilePicker({
        accept: '.CSV',
    });

    async function convertToCsv(content) {
        let csvData = await csv().fromString(content);
        let id = 1000;
        let data = {};

        csvData.forEach(row => {
            row.id = id++;
            row.category = 'None';
            data[row.id] = row;
        })

        saveCsv(data);

        console.log(data);
        console.log(Object.values(data));
        console.log(Object.keys(data));

        // Todo tomorrow
        // 1) write a function that returns number of rows stored in the backend!?
        // 2) if the number of the rows are not zero ask user would you like to replace the alreadly stored data 
        // 3) if user says yes to 2) or the backend data is nothing save the data to the backend as it IS WORKING NOW

    }

    function processContent(content) {
        convertToCsv(content);
        return null;
    }

    return (
        <Box>
            <Link onClick={() => openFileSelector()} style={headerStyle}>Select CSV File </Link>
            <br />
            {filesContent.map((file, i) => (<span key={i}>{processContent(file.content)}</span>))}
        </Box>
    );
}