import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import './style.css';

export default class InsertDocumentNewCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newData: '',
            collectionName: ''
        }
    }

    getDocumentData(e) {
        this.setState({ newData: e.target.value });
    }

    getNewCollectionName(e) {
        this.setState({ collectionName: e.target.value });
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Insert Document in New Collection"}
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Collection Name" variant="outlined" sx={{ marginTop: 2, marginBottom: 3 }}
                        value={this.state.collectionName}
                        onChange={(e) => this.getNewCollectionName(e)} />
                    <TextField
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
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="outlined">Submit</Button>
                </DialogActions>
            </>
        );
    }
}