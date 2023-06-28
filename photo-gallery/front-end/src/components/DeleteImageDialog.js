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
            handleCloseDialog: props.handleCloseDialog,
            selectedImage: props.selectedImage
        }
    }

    cancelAndClose() {
        this.state.handleCloseDialog();
    }

    deleteAndClose() {
        this.state.handleCloseDialog();
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Would you like to delete the following Image?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        <img src={this.state.selectedImage} style={{ width: 250, height: 250 }} alt="delete image" />
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


