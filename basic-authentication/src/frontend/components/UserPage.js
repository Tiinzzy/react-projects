import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

import BackEndConnection from './BackEndConnection';
import DialogPopUp from "./DialogPopUp";
import { shared } from './helper';

import './style.css'

const backend = BackEndConnection.INSTANCE();

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            openDialog: false
        }
    }

    getSecret() {
        let that = this;
        backend.checkLoginStatus((data) => {
            if (data.authorized === true) {
                that.setState({ openDialog: true });
            }
        })

        backend.callSecrete((data) => {
            that.setState({ secret: data });
        })
    }

    logOutUser() {
        let that = this;
        backend.logout_user((data) => {
            that.setState({ logout: data.authorized })
        })

        backend.checkLoginStatus((data) => {
            that.setState({ currentStatus: data.authorized });
        })

        if (that.state.currentStatus === that.state.logout) {
            shared.callLoginForm({ action: 'user-logged-out' });
        }
    }

    closeDialog() {
        this.setState({ openDialog: false });
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography mb={2} className="LoginHeader" variant="body1">
                        Hi <span style={{ fontWeight: 'bold' }}>{this.state.username}</span>, welcome back!
                    </Typography>
                    <Button style={{ marginBottom: 10 }} className="LoginBtn" variant="contained" onClick={() => this.getSecret()}>SECRET!</Button>
                    <Button className="LoginBtn" variant="contained" onClick={() => this.logOutUser()}>Logout</Button>
                </Box>
                <Dialog size="md" open={this.state.openDialog} onClose={() => this.closeDialog()}> <DialogPopUp secret={this.state.secret} /> </Dialog>
            </>
        );
    }
};