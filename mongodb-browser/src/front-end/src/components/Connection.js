import React from "react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default class Connection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleCLoseDialog: props.handleCLoseDialog
        }
    }

    connectAndClose() {
        this.state.handleCLoseDialog({ action: 'connect-and-close' });
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Connect to MongoDB"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.connectAndClose()}>Connect</Button>
                </DialogActions>
            </>
        );
    }
}