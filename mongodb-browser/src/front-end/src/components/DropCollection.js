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

function safeLength(s, max) {
    if (s.length > max) {
        return s.substring(0, max) + ' ...';
    } else {
        return s;
    }
}

export default class DropCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleCloseDialog: props.handleCloseDialog,
            connectionInfo: props.connectionInfo,
            newData: '',
            collectionName: '',
            databaseName: '',
            query: {},
            dataReady: true
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
            this.getCollectionList();
        });
    }

    getCollectionList() {
        this.state.query['database_name'] = this.state.databaseName;
        let query = { 'host_name': this.state.connectionInfo.host, 'port_name': this.state.connectionInfo.port, 'database_name': this.state.databaseName };
        backend.get_collections_mongo_db(query, (data) => {
            let that = this;
            that.setState({ collections: data.collections, dataReady: false })
        })
    }

    getCollectionName(e) {
        this.setState({ collectionName: e.target.value }, () => {
            this.state.query['collection_name'] = this.state.collectionName;
            backend.get_documents_mongo_db(this.state.query, (data) => {
                let that = this;
                that.setState({ documents: data.documents });
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
                    <FormControl fullWidth sx={{ marginBottom: 3 }} disabled={this.state.dataReady}>
                        <InputLabel id="demo-simple-select-label">Collection</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.collectionName}
                            label="COllection"
                            onChange={(e) => this.getCollectionName(e)}>
                            {this.state.collections && this.state.collections.map((e, i) => (
                                <MenuItem key={i} value={e}>{e}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div style={{ padding: 10, border: 'solid 1px #bbb', width: '97%' }}>
                        <Box className="display-documents-left-box">
                            <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={0}>
                                <tbody >
                                    <tr>
                                        <th width='20%'>ObjectId</th>
                                        <th width='20%'>Number of Object Keys</th>
                                        <th width='60%'>Values</th>
                                    </tr>
                                    {this.state.documents && this.state.documents.map((e, i) => (
                                        <tr key={i} onClick={() => this.displayData(e._id)}>
                                            <td style={{ color: this.state.selectedId === e._id ? '#1589FF' : 'black' }}
                                                onClick={() => this.setState({ selectedId: e._id })}>
                                                {e._id}
                                            </td>
                                            <td>
                                                {Object.keys(e).length}
                                            </td>
                                            <td>
                                                {safeLength(JSON.stringify(e), 100)}
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </Box>
                    </div>
                    <Box style={{ width: 1000 }}>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.cancelAndClose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.submitAndClose()} color="error">Drop Collection</Button>
                </DialogActions>
            </>
        );
    }
}