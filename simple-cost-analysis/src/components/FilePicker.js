import React from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import  Typography  from "@mui/material/Typography";

import { useFilePicker } from 'use-file-picker';

export default function FilePicker() {
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: '.CSV',
    });

    if (loading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            <Button onClick={() => openFileSelector()} variant="outlined">Select files </Button>
            <br />
            {filesContent.map((file, index) => (
                <Box>
                    <Typography>{file.name}</Typography>
                    <Box key={index}>{file.content}</Box>
                    <br />
                </Box>
            ))}
        </Box>
    );
}