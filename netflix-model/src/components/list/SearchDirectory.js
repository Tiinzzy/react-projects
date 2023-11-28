import React from "react";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class SearchDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            depth: '',
            erroMsg: ''
        }
    }

    getPath(e) {
        this.setState({ path: e.target.value, erroMsg: '' });
    }

    getDepth(e) {
        this.setState({ depth: e.target.value * 1, erroMsg: '' });
    }

    searchGetTree() {
        if (this.state.depth.length !== 0 || this.state.path.length !== 0) {
            let query = { 'depth': this.state.depth * 1, 'path': this.state.path };
            backend.get_directory_path(query, (data) => {
                console.log(data);
            });

        } else {
            this.setState({ erroMsg: 'PLease fill in all fields!' })
        }
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 5, padding: 20 }}>
                <TextField label="Directory Path" variant="outlined" onChange={(e) => this.getPath(e)} />
                <TextField label="Depth Level" variant="outlined" sx={{ mt: 3 }} onChange={(e) => this.getDepth(e)} />
                <Box style={{ display: 'flex', marginTop: 15 }}>
                    {this.state.erroMsg.length > 0 && <Typography color="crimson">{this.state.erroMsg}</Typography>}
                    <Box flexGrow={1} />
                    <Button variant="outlined" onClick={() => this.searchGetTree()}>Search</Button>
                </Box>
                <Divider sx={{ mt: 1 }} />
            </Box>
        );
    }
}
export default SearchDirectory;