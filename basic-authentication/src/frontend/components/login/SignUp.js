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
            passwordNotMatch: false
        }
    }

    getUsername(e) {
        this.setState({ username: e.target.value });
    }

    getPassword(e) {
        this.setState({ password: e.target.value, passwordNotMatch: false });
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
        if (this.state.username === null || this.state.confPass === null || this.state.password === null) {
            console.log('somethings wrong')
        } else if (this.state.password !== this.state.confPass) {
            this.setState({ passwordNotMatch: true })
        }
    }

    render() {
        return (
            <>
                <Box className="WholePageBox">
                    <Box className="LoginBox">
                        <Typography className="LoginHeader" variant="body1">Creat Account</Typography>
                        <TextField style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsername(e)} />
                        <TextField style={{ marginTop: 20, marginBottom: 20 }} type="password" label="Password" variant="outlined" onChange={(e) => this.getPassword(e)} />
                        {this.state.passwordNotMatch === false ?
                            <TextField style={{ marginBottom: 30 }} type="password" label="Confirm Password" variant="outlined" onChange={(e) => this.confirmPassword(e)} onKeyDown={(e) => this.confirmPassword(e)} /> :
                            <TextField error helperText="Passwords not matching" style={{ marginBottom: 30 }} type="password" label="Confirm Password" variant="outlined" onChange={(e) => this.confirmPassword(e)} onKeyDown={(e) => this.confirmPassword(e)} />}

                        <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.createNewUser()}>SIGNUP</Button>

                    </Box>
                </Box>
            </>
        );
    }
};