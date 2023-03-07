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

const backend = BackEndConnection.INSTANCE();

let mountCount = 0;

export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restId: props.restId,
            newPassword: '',
            confirmPassword: ''
        }
    }

    componentDidMount() {
        if (mountCount > 0) {
            return;
        }
        mountCount += 1;

        let that = this;
        backend.check_email_for_id(this.state.restId, (data) => {
            that.setState({ email: data.result });
        })
    }

    getNewPassword(e) {
        this.setState({ newPassword: e.target.value });
    }

    getNewPassConfrim(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    submitResetPasswordChange() {
        if (this.state.newPassword === this.state.confirmPassword && this.state.confirmPassword.length > 0 && this.state.newPassword.length > 0) {
            console.log('email: ', this.state.email)
            console.log('new password: ', this.state.newPassword)
            console.log('confirm password: ', this.state.confirmPassword)
        } else {
            console.log('there is something wrong')
        }
    }

    render() {
        return (
            <Box id='reset-password' className="WholePageBox">
                {this.state.restId ?
                    <Box className="ResetPassBox">
                        <DialogTitle>
                            {"Reset Password"}
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText>
                                Please enter a new password to change your password and recover account.
                            </DialogContentText>
                            <Box className="ResetPassBoxTextField">
                                <TextField label="Password" variant="outlined" type='password' style={{ marginBottom: 20 }} onChange={(e) => this.getNewPassword(e)} />
                                <TextField label="Confirm Password" variant="outlined" type='password' onChange={(e) => this.getNewPassConfrim(e)} />
                            </Box>
                        </DialogContent>
                        <DialogActions className="BtnActions">
                            <Button className="LoginBtn" variant="contained" onClick={() => this.submitResetPasswordChange()}>Search</Button>
                        </DialogActions>
                    </Box >
                    : "You can't be here"
                }
            </Box>
        );
    }
};