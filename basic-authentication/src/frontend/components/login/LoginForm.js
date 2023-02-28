import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import BackEndConnection from '../tools/BackEndConnection';

import './login.css'

const backend = BackEndConnection.INSTANCE();

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            username: null,
            login: false,
            openDialog: false,
            userError: false,
            passError: false
        }
    }

    getUsernmae(e) {
        this.setState({ username: e.target.value, userError: false });
    }

    getPassword(e) {
        this.setState({ password: e.target.value, passError: false });
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
            backend.login_user(this.state.username, this.state.password, (data) => {
                window.location = '/'
            });
        }
    }

    closeDialog() {
        this.setState({ openDialog: false });
    }

    render() {
        return (
            <>
                <Box className="WholePageBox">
                    <Box className="LoginBox">
                        <Typography className="LoginHeader" variant="body1">User Login</Typography>
                        {this.state.userError === false ? <TextField style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsernmae(e)} /> :
                            <TextField error helperText="Incorrect entry" style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsernmae(e)} />}
                        {this.state.passError === false ?
                            <TextField style={{ marginTop: 20, marginBottom: 30 }} label="Password" variant="outlined" type="password" onChange={(e) => this.getPassword(e)}
                                onKeyDown={(e) => this.getPassword(e)} /> :
                            <TextField error helperText="Incorrect entry" style={{ marginTop: 20, marginBottom: 30 }} label="Password" variant="outlined" type="password" onChange={(e) => this.getPassword(e)}
                                onKeyDown={(e) => this.getPassword(e)} />}
                        <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.loginUser()}>Login</Button>
                        <Box className="SignUpBox">
                            <Typography variant="body1" className="SignUpText">Not a member? <span id="span-sign-up">Creat an account</span></Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
};