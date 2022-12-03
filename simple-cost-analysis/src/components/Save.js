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
        if (this.state.rows.length < 100) {
            await saveCsv(this.state.jCsv);
            this.state.handleCloseDialog();
            this.state.callback(true);
        }
        setNewData(this.state.jCsv);
    }

    cancelAndClose(e) {
        this.state.handleCloseDialog();
        this.state.callback(false);
    }

    render() {
        return (
            <>
                {this.state.rows.length > 100 ? <DialogTitle>Can't Save The Following Data</DialogTitle>
                    : <DialogTitle>Would You Like to Save the Following Data?</DialogTitle>}
                <Divider />


                <Box className="SaveBoxGrid">
                    {this.state.rows.length > 100 ?
                        <Box>
                            The number of rows that you have uploaded are <span style={{ color: "red" }}> {this.state.rows.length} </span>.
                            <br />
                            PLease upload a file with less than 100 rows to be able to save it.
                        </Box> :
                        <DataGrid
                            style={{ height: 400, width: 900 }}
                            hideFooterPagination={true}
                            hideFooter={true}
                            rows={this.state.rows}
                            columns={this.state.columns} />
                    }
                </Box>

                {this.state.rows.length > 100 ? null :
                    <Box variant="body1" className="MessagesBox">
                        <Box className="TextMessage"> * Number of Rows in Uploaded Data: {this.state.rows.length}</Box>
                        <br />
                        <Box className="TextMessage"> * Saving the New File Will Remove any Pre-existing Data.</Box>
                    </Box>}
                <Divider />

                <DialogActions style={{ marginTop: 20, marginBottom: 20, marginRight: 20 }}>
                    <Button onClick={(e) => this.cancelAndClose(e)} variant="outlined" color="error"> Cancel </Button>
                    {this.state.rows.length > 100 ? null :
                        <Button onClick={(e) => this.save(e)} variant="outlined" color="success">Save</Button>}
                </DialogActions>
            </>
        );
    }
}
export default Save;