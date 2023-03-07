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
            confirmPassword: '',
            samePass: false,
            notMatching: false,
        }
    }

    componentDidMount() {
        if (mountCount > 0) {
            return;
        }
        mountCount += 1;

        let that = this;
        backend.check_email_for_id(this.state.restId, (data) => {
            that.setState({ email: data.result.email });
        })
    }

    getNewPassword(e) {
        this.setState({ newPassword: e.target.value, samePass: false, notMatching: false });
    }

    getNewPassConfrim(e) {
        this.setState({ confirmPassword: e.target.value, samePass: false, notMatching: false });
    }

    submitResetPasswordChange() {
        if (this.state.newPassword === this.state.confirmPassword && this.state.confirmPassword.length > 0 && this.state.newPassword.length > 0) {
            let that = this;
            backend.set_new_password(this.state.email, this.state.confirmPassword, (data) => {
                if (data.result.startsWith('old')) {
                    that.setState({ samePass: true })
                } else {
                    console.log(data.result)
                }
            })
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({ notMatching: true })
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
                                <TextField error={this.state.notMatching} helperText={this.state.notMatching && 'Passwords Not Matching'}
                                    label="Password" variant="outlined" type='password' style={{ marginBottom: 20 }} onChange={(e) => this.getNewPassword(e)} />

                                <TextField error={this.state.notMatching} helperText={this.state.notMatching && 'Passwords Not Matching'}
                                    label="Confirm Password" variant="outlined" type='password' onChange={(e) => this.getNewPassConfrim(e)} />

                                {this.state.samePass && <span className="SameOldPassErr">Your new password cannot be your old password.</span>}
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