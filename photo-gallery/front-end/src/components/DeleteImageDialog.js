import React, { Component } from 'react';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

const findTheObject = (obj, value) => {
    for (let i in obj) {
        if (Object.hasOwnProperty.call(obj, i)) {
            const innerObj = obj[i];
            for (let j in innerObj) {
                if (Object.hasOwnProperty.call(innerObj, j)) {
                    const innerValue = innerObj[j];
                    if (innerValue === value) {
                        return innerObj;
                    }
                }
            }
        }
    }
    return null;
};


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
            if(data.success){
                
            };
        })
        // this.state.handleCloseDialog();
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Would you like to delete the following Image?"}
                </DialogTitle>
                <DialogContent>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={this.state.selectedImage} style={{ width: 200, height: 200, border: 'solid 1px #eaeaea', borderRadius: 2 }} alt="delete img" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.cancelAndClose()} variant="outlined">No</Button>
                    <Button onClick={() => this.deleteAndClose()} variant="outlined">Yes</Button>
                </DialogActions>
            </>
        );
    }
}


