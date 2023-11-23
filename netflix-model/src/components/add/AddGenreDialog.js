import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose,
            genreDescription: ''
        }
    }

    getGenre(e) {
        this.setState({ genreDescription: e.target.value });
    }

    agreeAndClose() {
        if (this.props.addClick === "Genre" && this.state.genreDescription.length !== 0) {
            let query = { 'description': this.state.genreDescription };
            backend.add_genre(query, (data) => {
                if (data === true) {
                    this.state.handleClose('reload genre');
                };
            })
        } else {
            this.setState({ message: 'Please fill all fields!' });
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
                    <Typography style={{ color: 'crimson', marginLeft: 25 }}>{this.state.message}</Typography>
                    <Box display="flex" flexGrow={1} />
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddDialog;