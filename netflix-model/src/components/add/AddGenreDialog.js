import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose
        }
    }

    getGenre(e) {
        this.setState({ genreDescription: e.target.value });
    }

    agreeAndClose() {
        if (this.props.addClick === "Genre") {
            let query = { 'description': this.state.genreDescription };
            backend.add_genre(query, (data) => {
                if (data === true) {
                    this.state.handleClose();
                };
            })
        }
    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Add " + this.state.addClick}
                </DialogTitle>
                <DialogContent>
                    <TextField label="Genre Description" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getGenre(e)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddDialog;