import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import BackEndConnection from '../tools/BackEndConnection';

import { SIGNUP_PATH, FORGOT_PASSWORD_PATH, LOGIN_PATH } from '../../App';

import './login.css'

const backend = BackEndConnection.INSTANCE();

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            callbacktoChangePage: props.callbacktoChangePage,
            password: '',
            username: '',
            openDialog: false,
            userError: false,
            passError: false,
            wrongData: false,
            changeType: false
        }
        window.history.pushState('', '', LOGIN_PATH);
    }

    getUsernmae(e) {
        this.setState({ username: e.target.value, userError: false, wrongData: false });
    }

    getPassword(e) {
        this.setState({ password: e.target.value, passError: false, wrongData: false });
        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;
        if (isEnter) {
            this.loginUser();
        }
    }

    loginUser() {
        if (this.state.password.length === 0 || this.state.username.length === 0) {
            this.setState({ passError: true, userError: true });
        } else {
            let that = this;
            backend.login_user(this.state.username, this.state.password, (data) => {
                if (data.authorized) {
                    window.location = '/';
                } else {
                    that.setState({ wrongData: true });
                }
            });
        }
    }

    closeDialog() {
        this.setState({ openDialog: false });
    }

    signUpNewUser() {
        window.location = SIGNUP_PATH;
    }

    checkBoxClicked() {
        this.setState({ changeType: !this.state.changeType });
    }

    forgotPassword() {
        window.location = FORGOT_PASSWORD_PATH;
    }

    render() {
        return (
            <>
                <Box className="WholePageBox">
                    <Box className="LoginBox">
                        <Typography className="LoginHeader" variant="body1">User Login</Typography>
                        <TextField error={this.state.userError === true} helperText={this.state.userError === true && "Incorrect entry"} style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsernmae(e)} />

                        <TextField error={this.state.passError === true} helperText={this.state.passError === true && "Incorrect entry"} style={{ marginTop: 20, marginBottom: 10 }} label="Password" variant="outlined"
                            type={this.state.changeType === false ? "password" : "text"} onChange={(e) => this.getPassword(e)} onKeyDown={(e) => this.getPassword(e)} />

                        <FormControlLabel control={<Checkbox onChange={() => this.checkBoxClicked()} />} label="Show Password" />
                        {this.state.wrongData === true ? <Box className="IncorrectDataBox">Incorrect credentials</Box> : <Box className="IncorrectDataBox"></Box>}

                        <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.loginUser()}>Login</Button>
                        <Box className="SignUpBox">
                            <Typography variant="body1" className="SignUpText">
                                Not a member? <span id="span-sign-up" onClick={() => this.signUpNewUser()}>Creat an account</span>
                            </Typography>
                            <Typography variant="body1" className="SignUpText" mt={1}>
                                <span id="span-sign-up" onClick={() => this.forgotPassword()}>Forgot passowrd?</span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
};