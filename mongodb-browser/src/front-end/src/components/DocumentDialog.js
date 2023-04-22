import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import './style.css';

export default class DocumentDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedRow: props.clickedRow,
            oneDocument: props.oneDocument
        }
    }

    updatedDocument() {

    }

    deleteDocument() {

    }

    render() {
        return (
            <>
                <DialogTitle>
                    {'ObjectId("' + this.props.clickedRow + '")'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can view and edit the following document.
                    </DialogContentText>
                    <TextField
                        fullWidth multiline readOnly={true}
                        id="json-content"
                        sx={{ "& fieldset": { border: 'none' }, '& .MuiInputBase-input': { fontFamily: 'Courier', fontSize: '80%' } }}
                        rows={20}
                        value={JSON.stringify(this.props.oneDocument, null, 3)}
                    />
                    <Box style={{ width: 1000 }}>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.updatedDocument()}>Update</Button>
                    <Button variant="outlined" color="error" onClick={() => this.deleteDocument()}>Delete Document</Button>
                </DialogActions>
            </>
        );
    }
}