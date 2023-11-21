import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class UpdateGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: props.toBeUpdated,
            handleClose: props.handleClose,
            genreDescription: props.toBeUpdated.description
        }
    }

    getGenre(e) {
        this.setState({ genreDescription: e.target.value });
    }

    agreeAndClose() {
        let query = { 'oid': this.state.toBeUpdated.oid, 'description': this.state.genreDescription };
        backend.update_genre(query, (data) => {
            if (data === true) {
                this.state.handleClose('reload genre');
            };
        })
    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Update Genre OID: " + this.state.toBeUpdated.oid}
                </DialogTitle>
                <DialogContent>
                    <TextField label="Genre Description" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getGenre(e)} value={this.state.genreDescription} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default UpdateGenre;