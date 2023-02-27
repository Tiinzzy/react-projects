import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import BackEndConnection from './BackEndConnection';

import './style.css'
import UserPage from "./UserPage";

const backend = BackEndConnection.INSTANCE();

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            username: null,
            login: false
        }
    }

    getUsernmae(e) {
        this.setState({ username: e.target.value });
    }

    getPassword(e) {
        this.setState({ password: e.target.value });
    }

    getSecret() {
        backend.callSecrete((data) => {
            console.log(data);
        })
    }

    loginUser() {
        let that = this;
        backend.login_user(this.state.username, this.state.password, (data) => {
            if (data.authorized === true) {
                that.setState({ login: true })
            }
        });
    }

    render() {
        return (
            <>
                {this.state.login === false &&
                    <Box className="WholePageBox">
                        <Box className="LoginBox">
                            <Typography className="LoginHeader" variant="body1">User Login Form</Typography>
                            <TextField style={{ marginTop: 15 }} label="Username" variant="outlined" onChange={(e) => this.getUsernmae(e)} />
                            <TextField style={{ marginTop: 20, marginBottom: 30 }} label="Password" variant="outlined" type="password" onChange={(e) => this.getPassword(e)} />
                            <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.loginUser()}>Login</Button>

                            <Button style={{ marginTop: 10 }} className="LoginBtn" variant="contained" onClick={() => this.getSecret()}>SECRET!</Button>
                        </Box>
                    </Box>}
                {this.state.login === true &&
                    <Box className="WholePageBox">
                        <UserPage username={this.state.username} />
                    </Box>}
            </>
        );
    }
};