import React from "react";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 0,
            columns: 0,
            blocks: 0,
            valueError: false
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
            // do something
        } else {
            this.setState({ valueError: true });
        }
    }

    render() {
        return (
            <>
                <Box style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" fontSize="14" fontWeight="400">Create a Matrix</Typography>
                    <TextField label="Number of Rows" variant="outlined" style={{ marginTop: 20 }}
                        onChange={(e) => this.getRows(e)} type="number" error={this.state.valueError} helperText={this.state.valueError && 'Value bigger than 0'} />
                    <TextField label="Number of Columns" variant="outlined" style={{ marginTop: 20 }}
                        onChange={(e) => this.getColumns(e)} type="number" error={this.state.valueError} helperText={this.state.valueError && 'Value bigger than 0'} />
                    <TextField label="Number of Blocked Houses" variant="outlined" style={{ marginTop: 20 }}
                        onChange={(e) => this.getBlocks(e)} type="number" error={this.state.valueError} helperText={this.state.valueError && 'Value bigger than 0'} />
                    <Box style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: 20 }}>
                        <Button variant="contained" onClick={() => this.createMatrix()}>Create</Button>
                    </Box>
                </Box>
            </>
        );
    }
};