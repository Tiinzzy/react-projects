import React from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import FilePicker from './FilePicker'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                    <Box style={{marginRight: 10}}> <FilePicker /> </Box>
                    <Box style={{marginRight: 10}}> <Button variant="outlined">Save Data</Button> </Box>
                </Box>

            </>
        );
    }
}
export default Header;