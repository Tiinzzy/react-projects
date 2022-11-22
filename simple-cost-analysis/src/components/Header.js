import React from "react";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import FilePicker from './FilePicker'

class DialogContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginLeft: 30, paddingBottom: 10 }}>
                    <FilePicker />
                </Box>

            </>
        );
    }
}
export default DialogContent;