import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';
import PriceMenu from "./PriceMenu";
import TypeMenu from "./TypeMenu";

const backend = BackEndConnection.INSTANCE();

class AddSubscriptionDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose
        }
    }


    agreeAndClose() {
        if (this.props.addClick === "Subscription") {
            backend.add_subscription(query, (data) => {
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
                    <PriceMenu />
                    <TypeMenu />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddSubscriptionDialog;