import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import BackEndConnection from '../tools/BackEndConnection';

import './login.css'

const backend = BackEndConnection.INSTANCE();

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            confPass: null,
            username: null,
            passwordNotMatch: false,
            emptyErrUser: false,
            emptyErrPass: false,
            connection: false
        }
    }

    getUsername(e) {
        this.setState({ username: e.target.value, emptyErrUser: false });
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
        if (this.state.username === null && this.state.password === null && this.state.confPass === null) {
            this.setState({ emptyErrUser: true, emptyErrPass: true });
        } else if (this.state.password !== this.state.confPass) {
            this.setState({ passwordNotMatch: true });
        } else {
            let that = this;
            backend.get_mysql_connection_status((data) => {
                if (data.connectionStatus) {
                    that.setState({ connection: true }, () => {
                        if (that.state.connection) {
                            backend.sign_up_new_user(that.state.username, that.state.password, (data) => {
                                if (data.result.affectedRows === 1) {
                                    backend.login_user(that.state.username, that.state.password, (data) => {
                                        window.location = '/login'
                                    });
                                }
                            })
                        }
                    })
                }
            })
        }
    }

    loginUser(){
        window.location = '/login';
    }

    render() {
        return (
            <>
                <Box className="WholePageBox">
                    <Box className="LoginBox">
                        <Typography className="LoginHeader" variant="body1">Creat Account</Typography>
                        {this.state.emptyErrUser === false ? <TextField style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsername(e)} /> :
                            <TextField error helperText="Enter a username" style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsername(e)} />}
                        {this.state.emptyErrPass === false ? <TextField style={{ marginTop: 20, marginBottom: 20 }} type="password" label="Password" variant="outlined" onChange={(e) => this.getPassword(e)} /> :
                            <TextField error helperText="Enter a password" style={{ marginTop: 20, marginBottom: 20 }} type="password" label="Password" variant="outlined" onChange={(e) => this.getPassword(e)} />}
                        {this.state.passwordNotMatch === false ?
                            <TextField style={{ marginBottom: 35 }} type="password" label="Confirm Password" variant="outlined" onChange={(e) => this.confirmPassword(e)} onKeyDown={(e) => this.confirmPassword(e)} /> :
                            <TextField error helperText="Passwords not matching" style={{ marginBottom: 35 }} type="password" label="Confirm Password" variant="outlined" onChange={(e) => this.confirmPassword(e)} onKeyDown={(e) => this.confirmPassword(e)} />}

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