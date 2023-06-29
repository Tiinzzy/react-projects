import React, { Component } from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

import EventEmitter from 'eventemitter3';

import BackEndConnection from './BackEndConnection';
import { findTheObject } from './functions';

export const deleteEmitter = new EventEmitter();

const backend = BackEndConnection.INSTANCE();

export default class DeleteImageDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleCloseDialog: props.handleCloseDialog,
            selectedImage: props.selectedImage,
            allImagesInfo: props.allImagesInfo,
            imageName: ''
        }
    }

    componentDidMount() {
        let deleteImage = findTheObject(this.state.allImagesInfo, this.state.selectedImage);
        let imageName = deleteImage.file_real_name;
        this.setState({ imageName });
    }

    cancelAndClose() {
        this.state.handleCloseDialog();
    }

    deleteAndClose() {
        backend.delete_image(this.state.imageName, (data) => {
            if (data.success) {
                deleteEmitter.emit('check_updated', { message: 'image_deleted' });
                this.state.handleCloseDialog();
            };
        })
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


