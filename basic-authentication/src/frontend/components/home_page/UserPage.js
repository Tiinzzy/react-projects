import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import BackEndConnection from '../tools/BackEndConnection';
import DialogPopUp from "./DialogPopUp";

import './home_page.css'

const backend = BackEndConnection.INSTANCE();

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            openDialog: false,
            changePassword: false,
            displaySuccess: false,
            openSnack: false
        }
        this.closeDialog = this.closeDialog.bind(this);
    }

    getSecret() {
        let that = this;
        backend.callSecrete((data) => {
            if (data.authorized) {
                that.setState({ openDialog: true, secret: JSON.stringify(data.message), changePassword: false });
            }
        })
    }

    logOutUser() {
        backend.logout_user(() => {
            window.location = '/login';
        })
    }

    closeDialog(e) {
        if (e === 'password-changed-sucessfully') {
            this.setState({ displaySuccess: true, openSnack: true });
        }
        this.setState({ openDialog: false });
    }

    changeUserPassword() {
        this.setState({ openDialog: true, changePassword: true });
    }

    closeAlert() {
        this.setState({ openSnack: false });
    }

    render() {
        return (
            <>
                {this.state.displaySuccess === true &&
                    <Snackbar open={this.state.openSnack} onClose={() => this.closeAlert()} autoHideDuration={5000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert severity="success">Password changed sucessfully</Alert>
                    </Snackbar>}

                <Box className="WholePageBox">
                    <Box style={{ display: 'flex', flexDirection: 'column', }}>
                        <Typography mb={3} className="LoginHeader" variant="body1">
                            Hi <span style={{ fontWeight: 'bold' }}>{this.state.user}</span>, welcome back!
                        </Typography>
                        <Button style={{ marginBottom: 15 }} className="LoginBtn" variant="contained" onClick={() => this.getSecret()}>SECRET!</Button>
                        <Button style={{ marginBottom: 15 }} className="LoginBtn" variant="contained" onClick={() => this.changeUserPassword()}>Change Password</Button>
                        <Button className="LoginBtn" variant="contained" onClick={() => this.logOutUser()}>Logout</Button>
                    </Box>
                    <Dialog size="md" open={this.state.openDialog} onClose={() => this.closeDialog()}>
                        <DialogPopUp secret={this.state.secret} changePassword={this.state.changePassword} closeDialog={this.closeDialog} user={this.state.user} />
                    </Dialog>
                </Box>
            </>
        );
    }
};