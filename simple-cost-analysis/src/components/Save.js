import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DialogActions from "@mui/material/DialogActions";

import { saveCsv, getColumns } from './functions';

import { setNewData } from './DisplayGrid';

import './design.css';

class Save extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jCsv: props.jCsv,
            handleCloseDialog: props.handleCloseDialog,
            callback: props.callback,
            columns: [],
            rows: []
        }
        this.cancelAndClose = this.cancelAndClose.bind(this);
        this.save = this.save.bind(this);
    }

    async componentDidMount() {
        let data = Object.values(this.state.jCsv)
        let columns = getColumns(data[0]);
        this.setState({ rows: data, columns: columns });
    }

    async save(e) {
        await saveCsv(this.state.jCsv);
        this.state.handleCloseDialog();
        this.state.callback(true);
        setNewData(this.state.jCsv);
    }

    cancelAndClose(e) {
        this.state.handleCloseDialog();
        this.state.callback(false);
    }

    render() {
        return (
            <>
                <DialogTitle>Would you like to save the following data?</DialogTitle>
                <Divider />

                <Box className="SaveBoxGrid">
                    <DataGrid
                        style={{ height: 400, width: 1000 }}
                        hideFooterPagination={true}
                        hideFooter={true}
                        rows={this.state.rows}
                        columns={this.state.columns}
                    />
                </Box>

                <Box variant="body1" style={{ marginLeft: 30, marginTop: 20, marginBottom: 20 }}>
                    <span style={{ fontWeight: 'bold', marginRight:2 }}> * Number of rows in the following data:</span>  {this.state.rows.length}
                    <br />
                    <span style={{ fontWeight: 'bold' }}> * Saving the new file will remove any pre existing data.</span>
                </Box>
                <Divider />

                <DialogActions style={{ marginTop: 20, marginBottom: 20, marginRight: 20 }}>
                    <Button onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                    <Button onClick={(e) => this.save(e)} variant="outlined" color="success">Save</Button>
                </DialogActions>
            </>
        );
    }
}
export default Save;