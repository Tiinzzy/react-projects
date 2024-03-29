import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import BackEndConnection from '../tools/BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class DialogPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            secret: props.secret,
            changePassword: props.changePassword,
            closeDialog: props.closeDialog,
            user: props.user,
            currPass: null,
            newPass: null,
            confPass: null,
            wrongCurrPass: false,
            changeType: false,
            error: false
        }
    }

    getCurrentPassword(e) {
        this.setState({ currPass: e.target.value, error: false });
    }

    getNewPassword(e) {
        this.setState({ newPass: e.target.value, error: false });
    }

    getPasswordConfirm(e) {
        this.setState({ confPass: e.target.value, error: false });
        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;
        if (isEnter) {
            this.submitPassChanges();
        }
    }

    cancelChangePass() {
        this.state.closeDialog();
    }

    submitPassChanges() {
        if (this.state.newPass === this.state.confPass && this.state.currPass !== null) {
            backend.change_password(this.state.user, this.state.currPass, this.state.confPass, (data) => {
                let that = this;
                if (data.change !== null) {
                    let action = 'password-changed-sucessfully'
                    this.state.closeDialog(action);
                } else {
                    that.setState({ wrongCurrPass: true })
                }
            })
        } else (
            this.setState({ error: true })
        )
    }

    checkBoxClicked() {
        this.setState({ changeType: !this.state.changeType });
    }

    render() {
        return (
            <>
                {this.state.secret && this.state.changePassword === false &&
                    <Box style={{ height: 20, widht: 200, padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.secret} </Box>}
                {this.state.changePassword === true &&
                    <Box style={{ width: 600 }}>
                        <Box style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20 }}>
                            <Typography fontWeight="bold" variant="h5" mt={2} mb={2}>Change Password</Typography>

                            <TextField error={this.state.wrongCurrPass === true || this.state.error === true} helperText={this.state.wrongCurrPass === true && "Wrong Password"} style={{ marginTop: 15, marginBottom: 10 }}
                                label="Current Password" variant="outlined" type={this.state.changeType === false ? "password" : "text"} onChange={(e) => this.getCurrentPassword(e)} />

                            <TextField error={this.state.error === true} style={{ marginTop: 10, marginBottom: 10 }} label="New Password" variant="outlined" type={this.state.changeType === false ? "password" : "text"} onChange={(e) => this.getNewPassword(e)} />

                            <TextField error={this.state.error === true} style={{ marginTop: 10, marginBottom: 10 }} label="Confirm New Password" variant="outlined"
                            onKeyDown={(e) => this.getPasswordConfirm(e)} type={this.state.changeType === false ? "password" : "text"} onChange={(e) => this.getPasswordConfirm(e)} />

                            <FormControlLabel control={<Checkbox onChange={() => this.checkBoxClicked()} />} label="Show Password" />

                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginRight: 12 }}>
                            <DialogActions>
                                <Button className="LoginBtn" variant="contained" onClick={() => this.cancelChangePass()} style={{ marginBottom: 10 }}>Cancel</Button>
                                <Button className="LoginBtn" variant="contained" onClick={() => this.submitPassChanges()} style={{ marginBottom: 10 }}>Submit </Button>
                            </DialogActions>
                        </Box>

                    </Box>}
            </>
        );
    }
};