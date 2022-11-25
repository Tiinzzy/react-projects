import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import { getData, getColumns } from './functions';
import DialogContent from './DialogContent';

import './style.css';

class DisplayGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: [],
            dialogOpen: false,
            clickedRow: null,
            message: null,
            openSnack: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCloseSnack = this.handleCloseSnack.bind(this);
    }

    async componentDidMount() {
        let data = await getData();
        let columns = getColumns(data[0]);
        this.setState({ rows: data, columns: columns });
    }

    handleClick(e) {
        this.setState({ dialogOpen: true, clickedRow: e.row });
    }

    handleCloseDialog(e, message) {
        let openSnack = false;
        if (message) {
            openSnack = true;
        }
        this.setState({ dialogOpen: false, message, openSnack, clickedRow: null });
    }

    handleCloseSnack() {
        this.setState({ openSnack: false, message: null });
    }

    render() {
        return (
            <>
                <Box ClassName="DisplayGridBox">
                    <Box>
                        <DataGrid
                            style={{ height: 500 }}
                            hideFooterPagination={true}
                            hideFooter={true}
                            rows={this.state.rows}
                            columns={this.state.columns}
                            onCellDoubleClick={(e) => this.handleClick(e)}
                        />
                    </Box>
                    {this.state.dialogOpen && <Dialog onClose={(e) => this.handleCloseDialog(e)} open={this.state.dialogOpen} maxWidth='sm' fullWidth={true}>
                        <DialogTitle>Details</DialogTitle>
                        <DialogContent clickedRow={this.state.clickedRow} close={this.handleCloseDialog} />
                    </Dialog>}

                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                        open={this.state.openSnack}
                        autoHideDuration={2000}
                        onClose={this.handleCloseSnack}>

                        <SnackbarContent ClassName="DisplayGridSnack" style={{ backgroundColor: '#63A355', color: 'white', fontWeight: 'bold' }}
                            message={this.state.message} />
                    </Snackbar>

                </Box>

            </>
        );
    }
}
export default DisplayGrid;