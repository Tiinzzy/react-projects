import React from "react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class Connection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleCLoseDialog: props.handleCLoseDialog,
            host_name: 'localhost',
            port_name: 27017
        }
    }

    getHostName(e) {
        this.setState({ host_name: e.target.value });
    }

    getPortName(e) {
        this.setState({ port_name: e.target.value });
    }

    connectAndClose() {
        backend.connect_mongo_db(this.state.host_name, this.state.port_name, (data) => {
            let that = this;
            if (data.result) {
                that.state.handleCLoseDialog({ action: 'connect-and-close' });
            }
        })
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Connect to MongoDB"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Connect to default Host and Port or eneter your own values.
                    </DialogContentText>
                    <FormControl variant="standard" style={{ marginTop: 20 }}>
                        <InputLabel htmlFor="component-simple">Host</InputLabel>
                        <Input id="component-simple" defaultValue={this.state.host_name} style={{ width: 400 }} onChange={(e) => this.getHostName(e)} />
                    </FormControl>
                    <br />
                    <FormControl variant="standard" style={{ marginTop: 40, marginBottom: 20 }}>
                        <InputLabel htmlFor="component-simple">Port</InputLabel>
                        <Input id="component-simple" defaultValue={this.state.port_name} style={{ width: 400 }} onChange={(e) => this.getPortName(e)} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.connectAndClose()} variant="contained">Connect</Button>
                </DialogActions>
            </>
        );
    }
}