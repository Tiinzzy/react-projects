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

import BackEndConnection from '../tools/BackEndConnection';
import ResetPassword from './ResetPassword';

const backend = BackEndConnection.INSTANCE();

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            noEmail: false,
            openDialog: false
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
                    console.log(data.result[0].username);
                    that.setState({ openDialog: true, username: data.result[0].username });
                } else if (data.result.length === 0) {
                    that.setState({ noEmail: true });
                }
            })
        } else {
            this.setState({ emailError: true });
        }
    }

    closeDialog() {
        this.setState({ openDialog: false });
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
                            className="EmailTextfield" label="Email" variant="outlined" type='email' onChange={(e) => this.getEmail(e)} />
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
                    <ResetPassword username={this.state.username} email={this.state.email} closeDialog={this.closeDialog}/>
                </Dialog>
            </Box>
        );
    }
};