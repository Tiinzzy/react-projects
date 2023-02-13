import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import BackEndConnection from './BackEndConnection';
const backend = BackEndConnection.INSTANCE();

class EnterDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    setUrl(e) {
        this.setState({ url: e.target.value });
    }

    setDepth(e) {
        this.setState({ depth: e.target.value });
    }

    setSearch(e) {
        this.setState({ searchNum: e.target.value });
    }

    sendDataToBackend() {
        backend.get_crawling_result(this.state.url, this.state.depth, this.state.searchNum);
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', width: 600, marginTop: 30 }}>
                <Typography>Enter URL</Typography>
                <TextField size="small" variant="outlined" style={{ marginBottom: 20 }} onChange={(e) => this.setUrl(e)} />

                <Typography>Depth of Search</Typography>
                <TextField size="small" variant="outlined" style={{ marginBottom: 20 }} onChange={(e) => this.setDepth(e)} />

                <Typography>Number of Search</Typography>
                <TextField size="small" variant="outlined" style={{ marginBottom: 20 }} onChange={(e) => this.setSearch(e)} />

                <Box style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button variant="contained" onClick={() => this.sendDataToBackend()}>Submit</Button>
                </Box>
            </Box>
        );
    }
}
export default EnterDetails;