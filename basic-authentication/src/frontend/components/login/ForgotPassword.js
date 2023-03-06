import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    getEmail(e) {
        this.setState({ email: e.target.value })
    }

    cancelResetPassword() {
        window.location = '/'
    }

    submitResetPassword() {
        console.log(this.state.email);
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
                        <TextField className="EmailTextfield" label="Email" variant="outlined" onChange={(e) => this.getEmail(e)} />
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