import React, { Component } from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default class DeleteImageDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleCloseDialog: props.handleCloseDialog
        }
    }

    cancelAndClose() {
        this.state.handleCloseDialog();
    }

    deleteAndClose(){
        this.state.handleCloseDialog();
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Would you like to delete the following Image?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.cancelAndClose()}>Cancel</Button>
                    <Button onClick={() => this.deleteAndClose()}> Agree </Button>
                </DialogActions>
            </>
        );
    }
}


