import React from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import { useFilePicker } from 'use-file-picker';

export default function App() {
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        accept: '.CSV',
    });

    if (loading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            <Button onClick={() => openFileSelector()}>Select files </Button>
            <br />
            {filesContent.map((file, index) => (
                <Box>
                    <h2>{file.name}</h2>
                    <Box key={index}>{file.content}</Box>
                    <br />
                </Box>
            ))}
        </Box>
    );
}