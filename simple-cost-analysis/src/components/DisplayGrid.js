import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Popover from '@mui/material/Popover';

import GridDialogContent from "./GridDialogContent";

import { getData, getColumns, getGridHeight, getGridWidth } from './functions';
import { constants } from './constants';

var _displatGrid = null;

export function setNewData(data) {
    _displatGrid.setNewData(data);
}

const MAX_BAR_WIDTH = 800;

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
            showHelp: false,
            openPopover: false,
            popoverAnchorEl: null
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
        this.handleClosePopover = this.handleClosePopover.bind(this);
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

        let openSnack = isUpdated;
        let message = isUpdated ? ('Category Successfully Changed to "' + row.CATEGORY) + '"' : null;

        if (isUpdated) {
            if (typeof row.id === 'string') {
                row.id = [row.id];
            }

            let rows = this.state.rows;
            for (let i in rows) {
                if (row.id.indexOf(rows[i].id) >= 0) {
                    rows[i].CATEGORY = row.CATEGORY;
                }
            }
            this.setState({ rows }, function () {
                this.updateDistribution();
            });
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
        this.setState({
            rows: data,
            rowsCount: data.length,
            rowsSum: data.map(e => e.AMOUNT * 1).reduce((a, b) => a + b, 0),
            columns: columns,
            showHelp: (columns.length === 0)
        }, function () {
            this.updateDistribution();
        });
    }

    updateDistribution() {
        let distribution = {};

        constants.categories.forEach(c => {
            let count = this.state.rows.filter(d => d.CATEGORY === c).length;
            let sum = this.state.rows.filter(d => d.CATEGORY === c).map(e => e.AMOUNT * 1).reduce((a, b) => a + b, 0)
            distribution[c] = { sum, count };
        });

        distribution.All = this.state.rows.length;
        this.setState({ distribution: null }, function () {
            this.setState({ distribution });
        });
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

    handleClosePopover() {
        this.setState({ openPopover: false, popoverAnchorEl: null })
    }

    render() {
        return (
            <Box className="GridMainBox">
                {this.state.distribution && this.state.rows && !this.state.showHelp && <Box tyle={{ display: 'flex', flexDirection: 'column' }}>
                    <Box className="ToggleBox" >

                        {constants.categories.map((e, i) =>
                            <ToggleButtonGroup
                                key={i}
                                size="small"
                                color="primary"
                                value={this.state.category}
                                exclusive
                                onChange={(e) => this.handleChange(e)}>
                                <ToggleButton
                                    onMouseEnter={(e) => this.setState({ openPopover: true, popoverAnchorEl: e.target })}
                                    onMouseLeave={(e) => this.handleClosePopover()}
                                    onClick={(e) => this.handleToggle(e)}
                                    style={{ fontSize: 8, padding: 6, marginRight: 5 }} key={i} value={e}>
                                    {e + ' (' + this.state.distribution[e].count + ')'}
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
                                {constants.help.map((e, i) => (
                                    <li key={i}>{e}</li>
                                ))}
                            </ol>
                        </Box>}

                    {this.state.dialogOpen && <Dialog onClose={() => this.handleCloseDialog(false)} open={this.state.dialogOpen} maxWidth='sm' fullWidth={true}>
                        <DialogTitle>Details</DialogTitle>
                        <GridDialogContent clickedRow={this.state.clickedRow} close={this.handleCloseDialog} rows={this.state.rows} />
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
                <Popover
                    sx={{ pointerEvents: 'none', }}
                    open={this.state.openPopover}
                    anchorEl={this.state.popoverAnchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    onClose={this.handleClosePopover}
                    disableRestoreFocus>
                    {this.state.popoverAnchorEl && <Box className="PopoverBox">
                        {constants.categories.filter(e => e !== 'All').map((e, i) =>
                            <Box key={i} className="PopoverData">
                                <Box display='flex'>
                                    <Box> {e} </Box>
                                    <Box flexGrow={1} />
                                    <Box>{'$ ' + this.state.distribution[e].sum.toFixed(2)} </Box>
                                </Box>
                                <Box style={{
                                    width: ((this.state.distribution[e].sum * 1) / (this.state.rowsSum) * MAX_BAR_WIDTH),
                                    border: 'solid 2px ' + (e === this.state.popoverAnchorEl.value ? 'darkred' : 'steelblue')
                                }}></Box>
                            </Box>)}
                    </Box>}
                </Popover>

            </Box >
        );
    }
}

export default DisplayGrid;
