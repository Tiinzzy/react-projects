import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose
        }
    }

    componentDidMount() {
        if (this.state.addClick === "Genre") {
            this.agreeAndClose();
        };
    }

    agreeAndClose() {
        let query = { 'description': 'test' };
        backend.add_genre('query', (data) => {
            console.log(data);
        })
        this.state.handleClose();
    }


    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title">
                    {"Add " + this.state.addClick}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        HAVE TO LIST THE ADDING DETAIL HERE!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose}>Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()}>Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddDialog;