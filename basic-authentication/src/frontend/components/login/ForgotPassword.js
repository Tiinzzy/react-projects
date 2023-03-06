import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BackEndConnection from '../tools/BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            noEmail: false
        }
    }

    getEmail(e) {
        this.setState({ email: e.target.value, emailError: false, noEmail: false })
    }

    cancelResetPassword() {
        window.location = '/'
    }

    submitResetPassword() {
        if (this.state.email.includes('@')) {
            let that = this;
            backend.reset_password_for_forgotten(this.state.email, (data) => {
                if (data.result.startsWith('No')) {
                    that.setState({ noEmail: true })
                }
            })
        } else {
            this.setState({ emailError: true })
        }
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
                        <Button className="LoginBtn" variant="contained" onClick={() => this.submitResetPassword()}>Search</Button>
                    </DialogActions>
                </Box>
            </Box>
        );
    }
};


/*

USERS_TABLE
--------------------
user_name,
email,
passowrd_md5,
reset_password_id,
asked_for_reset_date

*/