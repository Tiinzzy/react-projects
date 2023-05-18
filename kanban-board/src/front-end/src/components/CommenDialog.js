import React from "react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default class CommenDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Make Comment"}
                </DialogTitle>
                <DialogContent>
                    <Box style={{ marginTop: 20, display: 'flex', flexDirection: 'column', width: 500 }}>
                        <TextField fullWidth multiline rows={6} label="Comment"
                            variant="outlined" style={{ marginBottom: 12 }} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" >Cancel</Button>
                    <Button variant="outlined" >Submit</Button>
                </DialogActions>
            </>
        );
    }
};