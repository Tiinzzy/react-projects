import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import GridDialogContent from "./GridDialogContent";

import { getData, getColumns, getGridHeight, getGridWidth } from './functions';

var _displatGrid = null;

export function setNewData(data) {
    _displatGrid.setNewData(data);
}

const HELP = [
    "First go to Upload File",
    "Select a file to uploead using the button",
    "The file must be CSV to be read",
    "When your file is uploaded, you will see a display of it",
    "There is also a display of any pervious data if it existed from before",
    "If youre satisfied with your file click on save button",
    "Once the pop-up comes up, you will be notified that saving new file will remove any previous data",
    "AFter saving the file new data will be available and you can see them in Show Data"
];

class DisplayGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            dialogOpen: false,
            clickedRow: null,
            message: null,
            openSnack: false,
            height: getGridHeight(),
            width: getGridWidth()
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCloseSnack = this.handleCloseSnack.bind(this);
        this.setNewData = this.setNewData.bind(this);
        _displatGrid = this;
        this.handleScreenResize = this.handleScreenResize.bind(this);
    }

    async componentDidMount() {
        let data = await getData();
        let columns = getColumns(data[0]);
        this.setState({ rows: data, columns: columns });

        window.addEventListener("resize", this.handleScreenResize);
    }


    handleClick(e) {
        this.setState({ dialogOpen: true, clickedRow: e.row });
    }

    handleCloseDialog(isUpdated, row) {
        let openSnack = isUpdated;
        let message = isUpdated ? 'Category Changed Successfully' : null;

        if (isUpdated) {
            let rows = this.state.rows;
            for (let i in rows) {
                if (rows[i].id === row.id) {
                    rows[i].CATEGORY = row.CATEGORY;
                    this.setState({ rows });
                    break;
                }
            }
        }

        this.setState({ dialogOpen: false, message, openSnack, clickedRow: null });
    }

    handleCloseSnack() {
        this.setState({ openSnack: false, message: null });
    }

    setNewData(data) {
        console.log(data);
        this.setState({ rows: Object.values(data) });
    }

    handleScreenResize() {
        this.setState({ height: getGridHeight(), width: getGridWidth() });
    }

    render() {
        return (
            <>
                {this.state.rows && this.state.rows.length > 0 &&
                        <DataGrid
                            style={{ height: this.state.height, width: this.state.width }}
                            hideFooterPagination={true}
                            hideFooter={true}
                            rows={this.state.rows}
                            columns={this.state.columns}
                            onCellDoubleClick={(e) => this.handleClick(e)}
                        />
                    }
                {this.state.rows && this.state.rows.length === 0 &&
                    <Box>
                        <ol>
                            {HELP.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ol>
                    </Box>}

                {this.state.dialogOpen && <Dialog onClose={() => this.handleCloseDialog(false)} open={this.state.dialogOpen} maxWidth='sm' fullWidth={true}>
                    <DialogTitle>Details</DialogTitle>
                    <GridDialogContent clickedRow={this.state.clickedRow} close={this.handleCloseDialog} />
                </Dialog>}

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={this.state.openSnack}
                    autoHideDuration={2000}
                    onClose={this.handleCloseSnack}>
                    <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', fontWeight: 'bold' }}
                        message={<div style={{ textAlign: 'center', width: 400 }}>{this.state.message}</div>} />
                </Snackbar>
            </>
        );
    }
}
export default DisplayGrid;