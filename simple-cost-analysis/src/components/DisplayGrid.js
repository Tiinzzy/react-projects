import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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

const CATEGORIES = ['All', 'None', 'Commute', 'Entertainment', 'Groceries', 'Houseware', 'Outfits', 'Utilities', 'Misc', 'Dining'];

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
            width: getGridWidth(),
            category: 'All',
            showHelp: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCloseSnack = this.handleCloseSnack.bind(this);
        this.setNewData = this.setNewData.bind(this);
        this.handleScreenResize = this.handleScreenResize.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.updateDistribution = this.updateDistribution.bind(this);
        _displatGrid = this;
    }

    async componentDidMount() {
        let data = await getData();
        this.refreshData(data);
        window.addEventListener("resize", this.handleScreenResize);
    }

    handleClick(e) {
        this.setState({ dialogOpen: true, clickedRow: e.row });
    }

    handleCloseDialog(isUpdated, row) {
        console.log(row.CATEGORY);
        let openSnack = isUpdated;
        let message = isUpdated ? ('Category Successfully Changed to "' + row.CATEGORY) + '"' : null;

        if (isUpdated) {
            let rows = this.state.rows;
            for (let i in rows) {
                if (rows[i].id === row.id) {
                    rows[i].CATEGORY = row.CATEGORY;
                    this.setState({ rows }, function () {
                        this.updateDistribution();
                    });
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
        this.setState({ rows: null, showHelp: true }, function () {
            this.refreshData(Object.values(data), function () {
                this.updateDistribution();
            });
        });
    }

    refreshData(data) {
        let columns = getColumns(data[0]);
        this.setState({ rows: data, columns: columns, showHelp: (columns.length === 0) }, function () {
            this.updateDistribution();
        });
    }

    updateDistribution() {
        let distribution = {};
        CATEGORIES.forEach(c => {
            distribution[c] = this.state.rows.filter(d => d.CATEGORY === c).length
        });
        distribution.All = this.state.rows.length;
        this.setState({ distribution });
    }

    handleScreenResize() {
        this.setState({ height: getGridHeight(), width: getGridWidth() });
    }

    async handleChange(e) {
        let data = await getData();
        let rows = [];

        this.setState({ category: e.target.value });

        if (this.state.category === 'All') {
            this.setState({ rows: data });
        } else {
            rows = data.filter((e) => (e.CATEGORY === this.state.category));
            this.setState({ rows: rows });
        }
    }

    handleToggle(e) {
        this.setState({ category: e.target.value });
    }

    render() {
        return (
            <Box className="GridMainBox">
                {this.state.distribution && this.state.rows && !this.state.showHelp && <Box tyle={{ display: 'flex', flexDirection: 'column' }}>
                    <Box className="ToggleBox" >

                        {CATEGORIES.map((e, i) =>
                            <ToggleButtonGroup
                                key={i}
                                size="small"
                                color="primary"
                                value={this.state.category}
                                exclusive
                                onChange={(e) => this.handleChange(e)}>
                                <ToggleButton onClick={(e) => this.handleToggle(e)} style={{ fontSize: 8, padding: 6, marginRight: 5 }} key={i} value={e}>
                                    {e + ' (' + this.state.distribution[e] + ')'}
                                </ToggleButton>
                            </ToggleButtonGroup>)}
                    </Box>
                </Box>}
                <Box className="GridTextBox">
                    {this.state.rows && !this.state.showHelp &&
                        <DataGrid
                            style={{ height: this.state.height, width: this.state.width }}
                            hideFooterPagination={true}
                            hideFooter={true}
                            rows={this.state.rows}
                            columns={this.state.columns}
                            onCellDoubleClick={(e) => this.handleClick(e)} />}
                    {this.state.showHelp &&
                        <Box pb={10}>
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
                </Box>
            </Box>
        );
    }
}

export default DisplayGrid;
