import React from "react";

import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class SubscriptionDelete extends React.Component {
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
        backend.delete_subscription(query, (data) => {
            if (data === true) {
                this.state.closeDialog('reload subscription');
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
                    {"Delete Movie OID: " + this.state.oid}
                </DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '500PX' }}>
                    <TextField label="Type" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.toBeDeleted.subscriptionType} disabled={true} />
                    <TextField label="Price" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.toBeDeleted.price} disabled={true} />
                    <TextField label="Expiry Date" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.toBeDeleted.expiryDate} disabled={true} />
                    <TextField label="Start Date" variant="outlined" style={{ margin: 10 }} size='small' value={this.state.toBeDeleted.subscriptionDate} disabled={true} />
                </DialogContent>
                <DialogActions>
                    <FormControlLabel
                        style={{ marginLeft: 15 }}
                        control={
                            <Checkbox checked={this.state.checkBox} onChange={() => this.handleCheckBox()} />}
                        label="Are you sure you want to delete the dollowing?" />
                    <Box display="flex" flexGrow={1} />
                    <Button onClick={this.state.closeDialog} variant="outlined">No</Button>
                    <Button autoFocus onClick={() => this.agreeAndClose()} variant="outlined" disabled={this.state.checkBox === false}>Yes</Button>
                </DialogActions>
            </>
        );
    }
}
export default SubscriptionDelete;