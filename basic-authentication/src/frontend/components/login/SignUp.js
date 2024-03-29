import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import BackEndConnection from '../tools/BackEndConnection';

import { LOGIN_PATH, SIGNUP_PATH } from '../../App';

import './login.css'

const backend = BackEndConnection.INSTANCE();

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confPass: '',
            username: '',
            email: '',
            passwordNotMatch: false,
            emptyErrUser: false,
            emptyErrPass: false,
            emptyErrEmail: false,
            changeType: false,
            alreadyExist: false
        }
    }

    getUsername(e) {
        this.setState({ username: e.target.value, emptyErrUser: false });
    }

    getEmail(e) {
        this.setState({ email: e.target.value, emptyErrEmail: false });
    }

    getPassword(e) {
        this.setState({ password: e.target.value, passwordNotMatch: false, emptyErrPass: false });
    }

    confirmPassword(e) {
        this.setState({ confPass: e.target.value, passwordNotMatch: false });
        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;
        if (isEnter) {
            this.createNewUser();
        }
    }

    createNewUser() {
        if (this.state.username.length === 0 || this.state.password.length === 0 || this.state.confPass.length === 0 || this.state.email.length === 0) {
            this.setState({ emptyErrUser: true, emptyErrPass: true, emptyErrEmail: true });
        } else if (this.state.password !== this.state.confPass) {
            this.setState({ passwordNotMatch: true });
        } else {
            let that = this;
            backend.sign_up_new_user(that.state.email, that.state.username, that.state.password, (data) => {
                console.log(data)
                if (data.result.affectedRows === 1) {
                    backend.login_user(that.state.username, that.state.password, () => {
                        window.open(LOGIN_PATH, '_blank');
                    });
                } else if (data.result.startsWith('Duplicate entry')) {
                    that.setState({ alreadyExist: true })
                }
            })
        }
    }

    loginUser() {
        window.location = LOGIN_PATH;
    }

    checkBoxClicked() {
        this.setState({ changeType: !this.state.changeType });
    }

    render() {
        return (
            <>
                <Box className="WholePageBox">
                    <Box className="LoginBox">
                        <Typography className="LoginHeader" variant="body1">Creat Account</Typography>

                        <TextField error={this.state.emptyErrUser === true} helperText={this.state.emptyErrUser === true && "Enter a username"} style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsername(e)} />
                        <TextField error={this.state.emptyErrEmail === true} helperText={this.state.emptyErrEmail === true && "Enter an Email"} style={{ marginTop: 15 }} label="Email" type="email" variant="outlined" onChange={(e) => this.getEmail(e)} />

                        <TextField error={this.state.emptyErrPass === true} helperText={this.state.emptyErrPass === true && "Enter a password"} style={{ marginTop: 20, marginBottom: 20 }}
                            type={this.state.changeType === false ? "password" : "text"} label="Password" variant="outlined" onChange={(e) => this.getPassword(e)} />

                        <TextField error={this.state.passwordNotMatch === true} helperText={this.state.passwordNotMatch === true && "Passwords not matching"} style={{ marginBottom: 10 }}
                            type={this.state.changeType === false ? "password" : "text"} label="Confirm Password" variant="outlined" onChange={(e) => this.confirmPassword(e)} onKeyDown={(e) => this.confirmPassword(e)} />

                        <FormControlLabel  control={<Checkbox onChange={() => this.checkBoxClicked()} />} label="Show Password" />

                        {this.state.alreadyExist === true ? <Box className="IncorrectDataBox" fontSize="16px">Username already exist</Box> : <Box className="IncorrectDataBox"></Box>}


                        <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.createNewUser()}>SIGNUP</Button>
                        <Box className="SignUpBox">
                            <Typography variant="body1" className="SignUpText">
                                Already have an account? <span id="span-sign-up" onClick={() => this.loginUser()}>Login</span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
};