import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

export default class InsertDocumentDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: props.collection,
            handleCLoseDialog: props.handleCLoseDialog,
            newData: ''
        }
    }

    getDocumentData(e) {
        this.setState({ newData: e.target.value });
    }

    cancelAndCLose() {
        this.state.handleCLoseDialog({ action: 'close' });
    }

    addDocument() {
        this.state.handleCLoseDialog({ action: 'close' });
    }

    render() {
        return (
            <>
                <DialogTitle>
                    Insert into <span style={{ fontWeight: 'bold' }}>  {this.state.collection} </span>  collection
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the json you would like to save in the collection.
                    </DialogContentText>
                    <TextField
                        sx={{ marginTop: 2, marginBottom: 3 }}
                        fullWidth multiline
                        rows={20}
                        label="Data"
                        variant="outlined"
                        value={this.state.newData}
                        onChange={(e) => this.getDocumentData(e)}
                    />
                    <Box style={{ width: 1000 }}>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.cancelAndCLose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.addDocument()}>Add</Button>
                </DialogActions>
            </>
        );
    }
}