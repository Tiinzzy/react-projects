import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './style.css'

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            username: null
        }
    }

    getUsernmae(e) {
        this.setState({ username: e.target.value });
    }

    getPassword(e) {
        this.setState({ password: e.target.value });
    }

    loginUser() {
        console.log('user:', this.state.username, ' password: ', this.state.password)
    }

    render() {
        return (
            <Box className="WholePageBox">
                <Box className="LoginBox">
                    <Typography className="LoginHeader" variant="body1">User Login Form</Typography>
                    <TextField style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsernmae(e)} />
                    <TextField style={{ marginTop: 20, marginBottom: 30 }} label="Password" variant="outlined" type="password" onChange={(e) => this.getPassword(e)} />
                    <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.loginUser()}>Login</Button>

                </Box>
            </Box>
        );
    }
};