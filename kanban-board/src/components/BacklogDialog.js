import React from "react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default class BacklogDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Add New Task"}
                </DialogTitle>
                <DialogContent>
                    <Box style={{ marginTop: 20, display: 'flex', flexDirection: 'column', width: 500 }}>
                        <TextField label="Title" variant="outlined" style={{ marginBottom: 18 }} />
                        <TextField fullWidth multiline rows={5} label="Description" variant="outlined" style={{ marginBottom: 18 }} />
                        <TextField label="Status" variant="outlined" style={{ marginBottom: 18 }} />
                        <TextField label="Priority" variant="outlined" style={{ marginBottom: 18 }} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="outlined">Submit</Button>
                </DialogActions>
            </>
        );
    }
};