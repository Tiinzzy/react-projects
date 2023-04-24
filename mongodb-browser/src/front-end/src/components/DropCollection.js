import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

export default class DropCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleCloseDialog: props.handleCloseDialog,
            connectionInfo: props.connectionInfo,
            newData: '',
            collectionName: '',
            databaseName: '',
            collections: '',
            query: {}
        }
    }

    componentDidMount() {
        this.state.query['host_name'] = this.state.connectionInfo.host;
        this.state.query['port_name'] = this.state.connectionInfo.port;
        backend.get_databases_mongo_db(this.state.query, (data) => {
            let that = this;
            that.setState({ availableDatabases: data.available_databases })
        })
    }

    getDatabaseName(e) {
        this.setState({ databaseName: e.target.value }, () => {
            this.state.query['database_name'] = this.state.databaseName;
            let query = { 'host_name': this.state.connectionInfo.host, 'port_name': this.state.connectionInfo.port, 'database_name': this.state.databaseName };
            backend.get_collections_mongo_db(query, (data) => {
                let that = this;
                that.setState({ collections: data.collections })
            })
        });
    }

    cancelAndClose() {
        this.state.handleCloseDialog({ action: 'close-dialog' });
    }

    submitAndClose() {
        this.state.handleCloseDialog({ action: 'close-dialog' });
    }


    render() {
        return (
            <>
                <DialogTitle>
                    {"Drop a Collection"}
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 3 }}>
                        <InputLabel id="demo-simple-select-label">Database</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.databaseName}
                            label="Database"
                            onChange={(e) => this.getDatabaseName(e)}>
                            {this.state.availableDatabases && this.state.availableDatabases.map((e, i) => (
                                <MenuItem key={i} value={e}>{e}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 3 }}>
                        <InputLabel id="demo-simple-select-label">Collection</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.databaseName}
                            label="COllection"
                            onChange={(e) => this.getDatabaseName(e)}>
                            {this.state.collections && this.state.collections.map((e, i) => (
                                <MenuItem key={i} value={e}>{e}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box style={{ width: 400 }}>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.cancelAndClose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.submitAndClose()}>Submit</Button>
                </DialogActions>            </>
        );
    }
}