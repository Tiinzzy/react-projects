import React from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class UpdateCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: props.toBeUpdated,
            handleClose: props.handleClose,
            customerName: props.toBeUpdated.name,
            phoneNumber: props.toBeUpdated.phoneNo,
            email: props.toBeUpdated.email
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
        let query = { 'oid': this.state.toBeUpdated.oid, 'name': this.state.customerName, 'phoneNo': this.state.phoneNumber, 'email': this.state.email };
        backend.update_customer(query, (data) => {
            if (data === true) {
                this.state.handleClose('reload customer');
            };
        })
    }

    render() {
        return (
            <>
                <DialogTitle id="alert-dialog-title" mb={2}>
                    {"Update Customer OID: " + this.state.toBeUpdated.oid}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column'}}>
                    <TextField label="Customer Name" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getCustomerName(e)} value={this.state.customerName} />
                    <TextField label="Phone Number" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getPhoneNumber(e)} value={this.state.phoneNumber} />
                    <TextField label="Email" variant="outlined" style={{ margin: 10 }} onChange={(e) => this.getEmail(e)} value={this.state.email} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.state.handleClose} variant="outlined">Disagree</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined">Agree</Button>
                </DialogActions>
            </>
        );
    }
}
export default UpdateCustomer;