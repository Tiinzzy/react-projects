import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BackEndConnection from '../tools/BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class ResetPasswordDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            username: props.username,
            closeDialog: props.closeDialog
        }
    }

    cancelandClose() {
        this.state.closeDialog();
    }

    submitResetPassword() {
        let that = this;
        backend.send_email_reset_password(this.state.email, (data) => {
            if (data.result.startsWith('Error')) {
                let action = 'error-occured';
                that.state.closeDialog(action);
            } else if (data.result.startsWith('Reset0')) {
                let action = 'sucessfull-reset';
                that.state.closeDialog(action);
            }
        })
    }

    render() {
        return (
            <Box>
                <DialogTitle id="alert-dialog-title">
                    {"Account Information"}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The following information is available from the email you entered.
                    </DialogContentText>
                    <Typography mt={2} mb={1} variant="body1"><span style={{ fontWeight: "bold" }}>Username: </span>{this.state.username}</Typography>
                    <Typography mb={2} mt={1} variant="body1"><span style={{ fontWeight: "bold" }}>Email: </span>{this.state.email}</Typography>
                </DialogContent>
                <DialogActions className="BtnActionsDialog">
                    <Button className="LoginBtn" variant="contained" onClick={() => this.cancelandClose()}>Cancel</Button>
                    <Button className="LoginBtn" variant="contained" onClick={() => this.submitResetPassword()}>Reset </Button>
                </DialogActions>
            </Box>
        );
    }
};