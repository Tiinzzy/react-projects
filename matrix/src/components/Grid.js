import React from "react";

import Box from '@mui/material/Box';

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Box style={{ width: '50%', marginTop: 35, borderTop: 'solid 1px gray' }}>
                This is grid
            </Box>
        );
    }
};