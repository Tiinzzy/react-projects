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
        }
    }

    createNewUser(){
        console.log('clicked')
    }

    render() {
        return (
            <>
                <Box className="WholePageBox">
                    <Box className="LoginBox">
                        <Typography className="LoginHeader" variant="body1">Creat Account</Typography>
                        <TextField style={{ marginTop: 15 }} label="Email" variant="outlined" />
                        <TextField style={{ marginTop: 20, marginBottom: 20 }} label="Password" variant="outlined" />
                        <TextField style={{ marginBottom: 30 }} label="Confirm Password" variant="outlined" />

                        <Button className="LoginBtn" variant="contained" color="primary" onClick={() => this.createNewUser()}>SIGNUP</Button>

                    </Box>
                </Box>
            </>
        );
    }
};