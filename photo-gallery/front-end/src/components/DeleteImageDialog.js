import React, { Component } from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import EventEmitter from 'eventemitter3';

export const deleteEmitter = new EventEmitter();

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

    render() {
        return (
            <>
                <DialogContent>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={this.state.selectedImage} style={{ height: 500, objectFit: 'contain' }} alt="delete img" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.cancelAndClose()} variant="outlined" size="small" style={{ marginRight: 15, marginBottom: 10 }}>Close</Button>
                </DialogActions>
            </>
        );
    }
}


