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
import DialogContentText from '@mui/material/DialogContentText';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

export default class InsertDocumentNewCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            handleCloseDialog: props.handleCloseDialog,
            connectionInfo: props.connectionInfo,
            newData: '',
            collectionName: '',
            databaseName: '',
            query: {},
            errorMessage: ''
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
        this.setState({ databaseName: e.target.value, errorMessage: '' }, () => {
            this.state.query['database_name'] = this.state.databaseName;
        });
    }

    getDocumentData(e) {
        this.setState({ newData: e.target.value, errorMessage: '' });
    }

    getNewCollectionName(e) {
        this.setState({ collectionName: e.target.value, errorMessage: '' }, () => {
            this.state.query['collection_name'] = this.state.collectionName;
        });
    }

    cancelAndClose() {
        this.state.handleCloseDialog({ action: 'close-dialog' });
    }

    submitAndClose() {
        try {
            let parsedDocument = JSON.parse(this.state.newData);
            this.state.query['documents'] = parsedDocument;
            backend.insert_documents_mongo_db(this.state.query, (data) => {
                if (data.inserted_count > 0) {
                    this.state.handleCloseDialog({ action: 'close-dialog' });
                };
            })
        }
        catch (err) {
            console.log(err)
            this.setState({ errorMessage: err.toString() });
        }
    }

    render() {
        return (
            <>
                <DialogTitle>
                    {"Insert Document in New Collection"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Select a database and enter a new collection name to insert data in new collection.
                    </DialogContentText>
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
                    <TextField fullWidth label="Collection Name" variant="outlined" sx={{ marginBottom: 3 }}
                        value={this.state.collectionName}
                        onChange={(e) => this.getNewCollectionName(e)} />
                    <TextField
                        sx={{ marginBottom: 3, '& .MuiInputBase-input': { fontFamily: 'Courier', fontSize: '80%' } }}
                        fullWidth multiline
                        rows={20}
                        label="Data"
                        InputProps={{ spellCheck: 'false' }}
                        variant="outlined"
                        value={this.state.newData}
                        onChange={(e) => this.getDocumentData(e)}
                    />
                    <Box style={{ width: 1000, border: 'solid 0px red', height: 10 }}>
                        {this.state.errorMessage !== '' && this.state.errorMessage}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => this.cancelAndClose()}>Cancel</Button>
                    <Button variant="outlined" onClick={() => this.submitAndClose()}>Submit</Button>
                </DialogActions>
            </>
        );
    }
}