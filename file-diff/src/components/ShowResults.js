import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ShowResults(props) {
    return (
        <Box style={{ display: 'inline-block', marginRight: 10, width: 400, marginTop: 15, marginBottom: 15 }}>
            <Box style={{ width: 400, textAlign: 'left' }}>
                <Typography variant="body2" component="div" >
                    {JSON.stringify(props.diff)}
                </Typography>
            </Box>
        </Box>
    );
}


