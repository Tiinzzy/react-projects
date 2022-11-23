import React from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import FilePicker from './FilePicker'

import { getData, saveCsv } from './functions';

class SaveFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleSave = this.handleSave.bind(this);
    }

    async handleSave() {
        let data = await getData();
        await saveCsv(data);
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>

                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20, marginTop: 20 }}>
                        Would you like to save the files?
                        <Box style={{ marginLeft: 20, display: 'inline-block' }}>
                            <Button onClick={() => this.handleSave()} variant="contained">Save File</Button>
                        </Box>
                    </Box>
                    <br />
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginBottom: 20 }}>
                        Click to open CSV file
                        <Box style={{ marginLeft: 20, display: 'inline-block' }}>
                            <FilePicker />
                        </Box>
                    </Box>
                </Box>

            </>
        );
    }
}
export default SaveFile;