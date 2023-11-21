import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class AddCustomerDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: props.addClick,
            handleClose: props.handleClose
        }
    }

    getCustomerName(e) {
        this.setState({ customerName: e.target.value });
    }

    getPhoneNumber(e) {
        this.setState({ phoneNumber: e.target.value });
    }

    getEmail(e) {
        this.setState({ email: e.target.value });
    }

    agreeAndClose() {
        if (this.props.addClick === "Customer") {
            let query = { 'name': this.state.customerName, 'phoneNo': this.state.phoneNumber, 'email': this.state.email };
            backend.add_customer(query, (data) => {
                if (data === true) {
                    this.state.handleClose();
                };
            })        }

    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Add " + this.state.addClick}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '500PX' }}>
                    <TextField label="Customer Name" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getCustomerName(e)} />
                    <TextField label="Phone Number" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getPhoneNumber(e)} />
                    <TextField label="Email" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getEmail(e)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default AddCustomerDialog;