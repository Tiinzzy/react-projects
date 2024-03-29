import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

import BackEndConnection from '../tools/BackEndConnection';

const backend = BackEndConnection.INSTANCE();

let mountCount = 0;

export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blockScreen: true,
            restId: props.restId,
            newPassword: '',
            confirmPassword: '',
            samePass: false,
            notMatching: false,
            changeType: false,
        }
    }

    componentDidMount() {
        if (mountCount > 0) {
            return;
        }
        mountCount += 1;
        let that = this;
        backend.check_email_for_id(this.state.restId, (data) => {
            if (data.msg === 'correct email') {
                that.setState({ email: data.result.email, blockScreen: false });
            } else if (data.msg.startsWith('Something')) {
                that.setState({ restId: '', blockScreen: false })
            }
        })

    }

    getNewPassword(e) {
        this.setState({ newPassword: e.target.value, samePass: false, notMatching: false });
    }

    getNewPassConfrim(e) {
        this.setState({ confirmPassword: e.target.value, samePass: false, notMatching: false });

        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;
        if (isEnter) {
            this.submitResetPasswordChange();
        }
    }

    submitResetPasswordChange() {
        if (this.state.newPassword === this.state.confirmPassword && this.state.confirmPassword.length > 0 && this.state.newPassword.length > 0) {
            let that = this;
            backend.set_new_password(this.state.email, this.state.confirmPassword, (data) => {
                console.log(data)
                if (data.result.startsWith('old')) {
                    that.setState({ samePass: true })
                } else {
                    backend.login_user(this.state.email, this.state.confirmPassword, (data) => {
                        if (data.authorized) {
                            window.location = '/';
                        }
                    })
                }
            })
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            this.setState({ notMatching: true })
        }
    }

    checkBoxClicked() {
        this.setState({ changeType: !this.state.changeType });
    }

    render() {
        return (
            <Box id='reset-password' className="WholePageBox">
                {this.state.blockScreen ?
                    <>
                    </>
                    :
                    <>
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
                                            type={this.state.changeType === false ? "password" : "text"}
                                            label="Password" variant="outlined" style={{ marginBottom: 20 }} onChange={(e) => this.getNewPassword(e)} />

                                        <TextField error={this.state.notMatching} helperText={this.state.notMatching && 'Passwords Not Matching'}
                                            type={this.state.changeType === false ? "password" : "text"}
                                            label="Confirm Password" variant="outlined" onChange={(e) => this.getNewPassConfrim(e)} onKeyDown={(e) => this.getNewPassConfrim(e)} />

                                        {this.state.samePass && <span className="SameOldPassErr">Your new password cannot be your old password.</span>}

                                        <FormControlLabel style={{ marginTop: 15 }} control={<Checkbox onChange={() => this.checkBoxClicked()} />} label="Show Password" />
                                    </Box>
                                </DialogContent>
                                <DialogActions className="BtnActions">
                                    <Button className="LoginBtn" variant="contained" onClick={() => this.submitResetPasswordChange()}>Submit</Button>
                                </DialogActions>
                            </Box >
                            : <Box className="ErrorBox">
                                <span className="ErrorSpan">
                                    <Typography variant="h5" fontWeight="bolder" fontSize="50px" mr={5} style={{ textShadow: '#f0f0f0 10px 12px' }}>
                                        Page Not Found!
                                    </Typography>
                                    <Typography variant="body2" fontSize="20px" mr={5} mt={2}>
                                        The Page you're looking for doesn't exist or an error occured.
                                    </Typography>
                                    <Typography variant="body2" fontSize="20px" mr={5}>
                                        Go back, or choose a new direction.
                                    </Typography>
                                </span>
                            </Box>
                        }
                    </>
                }
            </Box>
        );
    }
};