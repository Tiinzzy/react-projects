import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import BackEndConnection from '../tools/BackEndConnection';

import './login.css'

const backend = BackEndConnection.INSTANCE();

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            callbacktoChangePage: props.callbacktoChangePage,
            password: null,
            username: null,
            openDialog: false,
            userError: false,
            passError: false,
            wrongData: false,
            changeType: false
        }
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
        if (this.state.password === null && this.state.username === null || this.state.password === null || this.state.username === null) {
            this.setState({ userError: true, passError: true });
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
        window.location = '/sign-up';
    }

    checkBoxClicked() {
        this.setState({ changeType: !this.state.changeType });
    }

    render() {
        return (
            <>
                <Box className="WholePageBox">
                    <Box className="LoginBox">
                        <Typography className="LoginHeader" variant="body1">User Login</Typography>

                        {this.state.userError === false ?
                            <TextField style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsernmae(e)} /> :
                            <TextField error helperText="Incorrect entry" style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsernmae(e)} />}

                        {this.state.passError === false ?
                            <TextField style={{ marginTop: 20, marginBottom: 10 }} label="Password" variant="outlined" type={this.state.changeType === false ? "password" : "text"} onChange={(e) => this.getPassword(e)}
                                onKeyDown={(e) => this.getPassword(e)} />
                            :
                            <TextField error helperText="Incorrect entry" style={{ marginTop: 20, marginBottom: 10 }} label="Password" variant="outlined" type={this.state.changeType === false ? "password" : "text"} onChange={(e) => this.getPassword(e)}
                                onKeyDown={(e) => this.getPassword(e)} />}

                        <FormControlLabel control={<Checkbox onChange={() => this.checkBoxClicked()} />} label="Show Password" />
                        {this.state.wrongData === true ? <Box className="IncorrectDataBox">Icorrect username/ password</Box> : <Box className="IncorrectDataBox"></Box>}

                        <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.loginUser()}>Login</Button>
                        <Box className="SignUpBox">
                            <Typography variant="body1" className="SignUpText">
                                Not a member? <span id="span-sign-up" onClick={() => this.signUpNewUser()}>Creat an account</span>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
};