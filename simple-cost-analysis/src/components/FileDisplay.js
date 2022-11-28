import React from "react";

import Box from '@mui/material/Box';

import './design.css';

class FileDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Box className="FileDisplayBox">
                    <Box className="FileDisplayRow1">
                        <Box className="FileDisplayCol1">
                            this is a test file display row1, column 1
                        </Box>
                        <Box className="FileDisplayCol2">
                            this is a test file display row1, column 2
                        </Box>
                    </Box>
                    <Box className="FileDisplayRow2">
                    this is a test for where grid will be
                    </Box>
                </Box>
            </>
        );
    }
}
export default FileDisplay;