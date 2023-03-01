import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import BackEndConnection from '../tools/BackEndConnection';
import DialogPopUp from "./DialogPopUp";

import './home_page.css'

const backend = BackEndConnection.INSTANCE();

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            openDialog: false
        }
    }

    getSecret() {
        let that = this;
        backend.callSecrete((data) => {
            console.log(data);
            if (data.authorized) {
                that.setState({ openDialog: true, secret: JSON.stringify(data.message) });
            }
        })
    }

    logOutUser() {
        backend.logout_user(() => {
            window.location = '/login';
        })
    }

    closeDialog() {
        this.setState({ openDialog: false });
    }

    render() {
        return (
            <Box className="WholePageBox">
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography mb={2} className="LoginHeader" variant="body1">
                        Hi <span style={{ fontWeight: 'bold' }}>{this.state.user}</span>, welcome back!
                    </Typography>
                    <Button style={{ marginBottom: 10 }} className="LoginBtn" variant="contained" onClick={() => this.getSecret()}>SECRET!</Button>
                    <Button className="LoginBtn" variant="contained" onClick={() => this.logOutUser()}>Logout</Button>
                </Box>
                <Dialog size="md" open={this.state.openDialog} onClose={() => this.closeDialog()}> <DialogPopUp secret={this.state.secret} /> </Dialog>
            </Box>
        );
    }
};