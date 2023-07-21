import React from "react";

import EventEmitter from 'eventemitter3';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export const eventEmitter = new EventEmitter();

export default class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 5,
            columns: 15,
            blocks: 20,
            valueError: false,
            disableButton: false,
            displaySnack: false,
            openSnackBar: false
        }
    }

    getRows(e) {
        this.setState({ rows: e.target.value, valueError: false });
    }

    getColumns(e) {
        this.setState({ columns: e.target.value, valueError: false });
    }

    getBlocks(e) {
        this.setState({ blocks: e.target.value, valueError: false });
    }

    createMatrix() {
        if (this.state.rows > 0 && this.state.columns > 0 && this.state.blocks > 0) {
            eventEmitter.emit('gridData', { rows: this.state.rows, columns: this.state.columns, blocks: this.state.blocks, message: 'matrix-data' });
            this.setState({ disableButton: true });
        } else {
            this.setState({ valueError: true, displaySnack: true, openSnackBar: true });
        }
    }

    closeAlert(){
        this.setState({ displaySnack: false, openSnackBar: false });
    }

    render() {
        return (
            <>
                <Box style={{ width: '60%', display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContet: 'center', alignItems: 'center' }} >
                    <Typography variant="body1" fontSize="14" fontWeight="400" mb={2}>Create Matrix</Typography>
                    <Box style={{ display: 'flex', flexDirection: 'row', border: 'solid 1px #eaeaea', padding: 20, borderRadius: 3 }}>
                        <TextField label="Number of Rows" variant="outlined" style={{ marginRight: 20 }} value={this.state.rows}
                            onChange={(e) => this.getRows(e)} type="number" error={this.state.valueError} helperText={this.state.valueError && 'Value bigger than 0'} />
                        <TextField label="Number of Columns" variant="outlined" style={{ marginRight: 20 }} value={this.state.columns}
                            onChange={(e) => this.getColumns(e)} type="number" error={this.state.valueError} helperText={this.state.valueError && 'Value bigger than 0'} />
                        <TextField label="Number of Blocked Houses" variant="outlined" style={{ marginRight: 20 }} value={this.state.blocks}
                            onChange={(e) => this.getBlocks(e)} type="number" error={this.state.valueError} helperText={this.state.valueError && 'Value bigger than 0'} />
                        <Button variant="contained" onClick={() => this.createMatrix()} disabled={this.state.disableButton} size="small">Submit</Button>
                    </Box>
                </Box>
                {this.state.displaySnack === true &&
                    <Snackbar open={this.state.openSnackBar} onClose={() => this.closeAlert()} autoHideDuration={4500} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert severity="error">
                            Need values more than zero
                        </Alert>
                    </Snackbar>}
            </>
        );
    }
};