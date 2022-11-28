import React from 'react';

import { useFilePicker } from 'use-file-picker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { appCallBack } from '../App';

function passContentToParent(callback, file) {
    // callback(file);
    appCallBack(file);
    return file.name;
}

export default function FilePicker(props) {
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: '.CSV',
    });

    return (
        <>
            <Box className='FilePickerBox'>
                <Box className='FilePickerButton'>
                    <Button variant="outlined" onClick={() => openFileSelector()}>Select file </Button>
                </Box>
                <Box className='FilePickerName'>
                    File Name:
                    {filesContent.map((file, index) => (
                        <Box key={index} pl={1}> {passContentToParent(props.callFileDisplay, file)}</Box>
                    ))}
                </Box>
            </Box>
        </>

    );
}