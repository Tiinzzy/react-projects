import React from "react";

import Box from '@mui/material/Box';

import FilePicker from "./FilePicker";
import Save from "./Save";
import DisplayGrid from "./DisplayGrid";

import './design.css';

class FileDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            callback: props.callback
        }

        this.callback = this.callback.bind(this);
    }

    callback(file) {
        this.state.callback(file);
    }

    render() {
        return (
            <>
                <Box className="FileDisplayBox">
                    <Box className="FileDisplayRow1">
                        <Box className="FileDisplayCol1">
                            <FilePicker callFileDisplay={this.callback} date='2022-10-10'/>
                        </Box>
                        <Box className="FileDisplayCol2">
                        <Save />
                        </Box>
                    </Box>
                    <Box className="FileDisplayRow2">
                        <DisplayGrid />
                    </Box>
                </Box>
            </>
        );
    }
}
export default FileDisplay;