import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './design.css';

class Save extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Box className="SaveBox">
                    <Box className="SaveText">
                        Would you LIke to save the new file?
                    </Box>
                    <Box className="SaveButton">
                        <Button variant="outlined">Save File </Button>
                    </Box>
                </Box>
            </>
        );
    }
}
export default Save;