import React from "react";

import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class MovieDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeDialog: props.closeDialog,
            toBeDeleted: props.toBeDeleted,
            checkBox: false
        }
    }

    agreeAndClose() {
        let query = { 'oid': this.props.toBeDeleted.oid };
        backend.delete_movie(query, (data) => {
            if (data === true) {
                this.state.closeDialog('reload movie');
            };
        })
    }

    handleCheckBox() {
        this.setState({ checkBox: !this.state.checkBox });
    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Delete Movie"}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '500PX' }}>
                    <Typography>OID: <span>{this.state.toBeDeleted.oid}</span></Typography>
                    <Typography>Title: <span>{this.state.toBeDeleted.movieTitle}</span></Typography>
                    <Typography>Release Date: <span>{this.state.toBeDeleted.releaseDate}</span></Typography>
                    <Typography>Rating: <span>{this.state.toBeDeleted.rating}</span></Typography>
                </DialogContent>
                <DialogActions>
                    <FormControlLabel
                        control={
                            <Checkbox checked={this.state.checkBox} onChange={() => this.handleCheckBox()} />}
                        label="Are you sure you want to delete the dollowing?" />
                    <Button onClick={this.state.closeDialog} variant="outlined">No</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined" disabled={this.state.checkBox === false}>Yes</Button>
                </DialogActions>
            </>
        );
    }
}
export default MovieDelete;