import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

export default class DocumentDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedRow: props.clickedRow,
            oneDocument: JSON.stringify(props.oneDocument, null, 3),
            handleCLoseDialog: props.handleCLoseDialog,
            query: props.query,
            errorMessage: ''
        }
    }

    getDocumentChanges(e) {
        this.setState({ oneDocument: e.target.value });
    }

    cancelAndCLose() {
        this.state.handleCLoseDialog({ action: 'close' });
    }

    updatedDocument() {
        try {
            let newOneDocument = JSON.parse(this.state.oneDocument);
            delete newOneDocument['_id'];

            this.state.query['document_id'] = this.state.clickedRow;
            this.state.query['documents'] = newOneDocument;

            backend.update_document_mongo_db(this.state.query, (data) => {
                let that = this;
                if (data.result) {
                    delete that.state.query['documents'];
                    delete that.state.query['document_id'];
                    that.state.handleCLoseDialog({ action: 'close' });
                };
            });
        } catch (err) {
            this.setState({ errorMessage: err.toString() })
        }

    }

    deleteDocument() {
        this.state.query['_id'] = this.state.clickedRow;
        backend.delete_document_mongo_db(this.state.query, (data) => {
            let that = this;
            if (data.result) {
                delete that.state.query['_id'];
                that.state.handleCLoseDialog({ action: 'close' });
            };
        })
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {'ObjectId("' + this.state.clickedRow + '")'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        InputProps={{ spellCheck: 'false' }}
                        fullWidth multiline
                        id="json-content"
                        sx={{ "& fieldset": { border: 'none' }, '& .MuiInputBase-input': { fontFamily: 'Courier', fontSize: '80%' } }}
                        rows={20}
                        value={this.state.oneDocument}
                        onChange={(e) => this.getDocumentChanges(e)}
                    />
                    <Box style={{ width: 1000 }}>
                    </Box>
                </DialogContent>
                <Divider />
                {this.state.errorMessage}
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.cancelAndCLose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.updatedDocument()}>Update</Button>
                    <Button variant="outlined" color="error" onClick={() => this.deleteDocument()}>Delete Document</Button>
                </DialogActions>
            </>
        );
    }
}