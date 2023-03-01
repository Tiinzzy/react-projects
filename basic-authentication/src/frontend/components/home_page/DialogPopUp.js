import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';

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
            confPass: null
        }
    }

    getCurrentPassword(e) {
        this.setState({ currPass: e.target.value });
    }

    getNewPassword(e) {
        this.setState({ newPass: e.target.value });
    }

    getPasswordConfirm(e) {
        this.setState({ confPass: e.target.value });
    }

    cancelChangePass() {
        this.state.closeDialog();
    }

    submitPassChanges() {
        if (this.state.newPass === this.state.confPass && this.state.currPass !== null) {
            backend.change_password(this.state.user, this.state.currPass, this.state.confPass, (data) => {
                console.log(data);
            })
        } else (
            console.log('there is something wrong')
        )
        // this.state.closeDialog();
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
                            <Typography fontWeight="bold" variant="h5" mt={2}>Change Password</Typography>
                            <TextField style={{ marginTop: 15, marginBottom: 10 }} label="Curretn Password" variant="outlined" type="password" onChange={(e) => this.getCurrentPassword(e)} />

                            <TextField style={{ marginTop: 10, marginBottom: 10 }} label="New Password" variant="outlined" type="password" onChange={(e) => this.getNewPassword(e)} />

                            <TextField style={{ marginTop: 10, marginBottom: 10 }} label="Confirm New Password" variant="outlined" type="password" onChange={(e) => this.getPasswordConfirm(e)} />
                        </Box>
                        <Box style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginRight: 12 }}>
                            <DialogActions>
                                <Button className="LoginBtn" variant="contained" onClick={() => this.cancelChangePass()}>Cancel</Button>
                                <Button className="LoginBtn" variant="contained" onClick={() => this.submitPassChanges()}>Submit </Button>
                            </DialogActions>
                        </Box>

                    </Box>}
            </>
        );
    }
};