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
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import GridDialogContent from "./GridDialogContent";
import GraphDisplay from "./GraphDisplay";

import { getData, getColumns, getGridHeight, getGridWidth, getDailyAmount, getWeekDaysAmount, geDetailedtWeekDaysAmount } from './functions';
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
            popoverAnchorEl: null,
            graphDialog: false,
            dailySummaryData: null,
            weekDaysSummaryData: null,
            detailedSummary: null,
            anchorEl: null,
            openMenu: false
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
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        _displatGrid = this;
    }

    async componentDidMount() {
        let data = await getData();

        let dailySummaryData = getDailyAmount(data);
        dailySummaryData = dailySummaryData.map(function (e) {
            return Object.keys(e).map(g => e[g])
        });

        let weekDaysSummaryData = getWeekDaysAmount(data);
        weekDaysSummaryData = weekDaysSummaryData.map(function (e) {
            return Object.keys(e).map(g => e[g])
        });

        let detailedSummary = geDetailedtWeekDaysAmount(data);
        console.log('--------------->>');
        console.log(detailedSummary)
        console.log('<<---------------');

        this.refreshData(data);
        window.addEventListener("resize", this.handleScreenResize);

        dailySummaryData.unshift(['DATE', 'AMOUNT']);
        weekDaysSummaryData.unshift(['DAYS', 'AMOUNT']);



        this.setState({ dailySummaryData, weekDaysSummaryData, detailedSummary })
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

        distribution['All'] = {
            count: this.state.rows.length,
            sum: this.state.rows.map(e => e.AMOUNT).reduce((a, b) => a + b, 0)
        };
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

    handleOpenMenu(e) {
        this.setState({ openMenu: true, anchorEl: e.target })
    }

    handleCloseMenu(index) {
        if (index == 1) {
            // open daily summary chart
            this.setState({ openMenu: false, graphIndex: 1, graphDialog: true });
        } else if (index == 2) {
            // open day of week summary chart
            this.setState({ openMenu: false, graphIndex: 2, graphDialog: true });
        } else if (index == 3) {
            this.setState({ openMenu: false, graphIndex: 3, graphDialog: true });
        }
        else {
            // open NOTHING
            this.setState({ openMenu: false, graphIndex: 0, graphDialog: false });
        }
    }

    renderMenu() {
        return (
            <Box style={{ marginLeft: 'auto', justifyContent: 'right' }} >
                <Button onClick={(e) => this.handleOpenMenu(e)} variant="outlined" size="small">Charts</Button>
                <Menu
                    size='small'
                    style={{ width: 200 }}
                    anchorEl={this.state.anchorEl}
                    open={this.state.openMenu}
                    value={1}
                    onClose={() => this.handleCloseMenu(0)}>
                    <MenuItem onClick={() => this.handleCloseMenu(1)} >Daily Graph</MenuItem>
                    <MenuItem onClick={() => this.handleCloseMenu(2)}> Weekly Graph</MenuItem>
                    <MenuItem onClick={() => this.handleCloseMenu(3)}> Detailed Daily Graph</MenuItem>
                </Menu>
            </Box>
        );
    }

    renderEasyFilterBox(e, i) {
        if (typeof this.state.distribution[e] === 'undefined') {
            console.log(this.state.distribution[e]);
        }
        return (
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
            </ToggleButtonGroup>
        );
    }

    renderPopoverAndSnackBar() {
        return (
            <>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                    open={this.state.openSnack}
                    autoHideDuration={2000}
                    onClose={this.handleCloseSnack}>
                    <SnackbarContent style={{ backgroundColor: '#63A355', color: 'white', fontWeight: 'bold' }}
                        message={<div style={{ textAlign: 'center', width: 400 }}>{this.state.message}</div>} />
                </Snackbar>
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
            </>
        );
    }

    renderDialogs() {
        return (
            <>
                {this.state.dialogOpen &&
                    <Dialog
                        onClose={() => this.handleCloseDialog(false)}
                        open={this.state.dialogOpen}
                        maxWidth='sm' fullWidth={true}>
                        <DialogTitle>Details</DialogTitle>
                        <GridDialogContent clickedRow={this.state.clickedRow} close={this.handleCloseDialog} rows={this.state.rows} />
                    </Dialog>}

                <Dialog
                    onClose={() => this.setState({ graphDialog: false })}
                    open={this.state.graphDialog} maxWidth='lg' fullWidth={true}>
                    <DialogTitle>Expenses Chart</DialogTitle>
                    <GraphDisplay
                        graphIndex={this.state.graphIndex}
                        dailyData={this.state.dailySummaryData}
                        weekDaysData={this.state.weekDaysSummaryData}
                        detailedSummary={this.state.detailedSummary} />
                </Dialog>
            </>
        );
    }

    renderHelp() {
        return (
            <Box pb={10}>
                <ol>
                    {constants.help.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ol>
            </Box>
        );
    }

    render() {
        return (
            <Box className="GridMainBox">

                {this.state.distribution && this.state.rows && !this.state.showHelp &&
                    <Box tyle={{ display: 'flex', flexDirection: 'column' }}>
                        <Box className="ToggleBox" >
                            {constants.categories.map((e, i) => this.renderEasyFilterBox(e, i))}
                            {this.renderMenu()}
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

                    {this.state.showHelp && this.renderHelp()}
                </Box>

                {this.renderDialogs()}
                {this.renderPopoverAndSnackBar()}

            </Box >
        );
    }
}

export default DisplayGrid;
