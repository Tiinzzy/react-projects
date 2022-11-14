import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Header(props) {
    return (
        <Box style={{ padding: 5, background: '#34344A', marginBottom: 10, color: '#CC5A71' }}>
            <Typography variant="body2" component="div" >Compare Texts</Typography>
        </Box>
    );
}


