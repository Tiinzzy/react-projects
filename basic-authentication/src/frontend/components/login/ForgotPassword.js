import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from "@mui/material/Dialog";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import BackEndConnection from '../tools/BackEndConnection';
import ResetPasswordDialog from './ResetPasswordDialog';

const backend = BackEndConnection.INSTANCE();

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            noEmail: false,
            openDialog: false,
            displaySnack: false,
            snackError: false,
            snackSuccess: false
        }
        this.closeDialog = this.closeDialog.bind(this);
    }

    getEmail(e) {
        this.setState({ email: e.target.value, emailError: false, noEmail: false })
    }

    cancelResetPassword() {
        window.location = '/'
    }

    submitSearchEmail() {
        if (this.state.email.includes('@')) {
            let that = this;
            backend.check_see_if_email_exist(this.state.email, (data) => {
                if (data.result.length > 0) {
                    that.setState({ openDialog: true, username: data.result[0].username });
                } else if (data.result.length === 0) {
                    that.setState({ noEmail: true });
                }
            })
        } else {
            this.setState({ emailError: true });
        }
    }

    closeDialog(action) {
        this.setState({ openDialog: false });
        if (action && action === 'error-occured') {
            this.setState({ email: '', displaySnack: true, openSnack: true, snackError: true });
        } else if (action && action === 'sucessfull-reset') {
            this.setState({ displaySnack: true, openSnack: true, snackSuccess: true });
        }
    }
    closeAlert() {
        this.setState({ openSnack: false });
    }

    render() {
        return (
            <Box className="WholePageBox">
                <Box className="ForgotPasswordBox">
                    <DialogTitle id="alert-dialog-title">
                        {"Find Your Account"}
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please enter your email address to search for your account and reset your password.
                        </DialogContentText>
                        <TextField error={this.state.emailError === true} helperText={this.state.emailError === true && 'Enter a valid email'}
                            className="EmailTextfield" label="Email" variant="outlined" type='email' onChange={(e) => this.getEmail(e)} value={this.state.email} />
                        {this.state.noEmail === true &&
                            <DialogContentText id="alert-dialog-description" className="NoEmailFound">
                                There's no account with the info you provided.
                            </DialogContentText>}
                    </DialogContent>
                    <DialogActions className="BtnActions">
                        <Button className="LoginBtn" variant="contained" onClick={() => this.cancelResetPassword()}>Cancel</Button>
                        <Button className="LoginBtn" variant="contained" onClick={() => this.submitSearchEmail()}>Search</Button>
                    </DialogActions>
                </Box>

                <Dialog open={this.state.openDialog} onClose={() => this.closeDialog()}>
                    <ResetPasswordDialog username={this.state.username} email={this.state.email} closeDialog={this.closeDialog} />
                </Dialog>

                {this.state.displaySnack === true &&
                    <Snackbar open={this.state.openSnack} onClose={() => this.closeAlert()} autoHideDuration={5000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert severity={this.state.snackError === true && "error" || this.state.snackSuccess === true && "success"}>
                            {this.state.snackError === true ? 'Something went wrong. Try again.' : 'Reset password email sent successfully to ' + this.state.email}
                        </Alert>
                    </Snackbar>}
            </Box>
        );
    }
};