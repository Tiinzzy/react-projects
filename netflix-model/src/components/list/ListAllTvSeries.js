import React from "react";

import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';

import EventEmitter from 'eventemitter3';

import UpdateTvSeries from '../edit/UpdateTvSeries';
import TvSeriesDelete from "../delete/TvSeriesDelete";

export const tvSeriesUpdate = new EventEmitter();


class ListAllTvSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvseriesData: props.tvseriesData,
            openDialog: false
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    dialogToDelete(e) {
        this.setState({ openDialog: true, toBeDeleted: e, selection: 'delete' });
    }

    handleCloseDialog(e) {
        if (e) {
            this.setState({ openDialog: false }, () => {
                if (e === 'reload tvseries') {
                    tvSeriesUpdate.emit('update', { task: 'update' });
                }
            })
        } else {
            this.setState({ openDialog: false });
        }
    }

    openEdit(e) {
        this.setState({ openDialog: true, toBeUpdated: e, selection: 'update' })
    }

    render() {
        return (
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>OID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Summary</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.tvseriesData.map((e, i) => (
                                <TableRow
                                    onDoubleClick={() => this.openEdit(e)}
                                    hover
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="e">{e.oid}</TableCell>
                                    <TableCell>{e.title}</TableCell>
                                    <TableCell>{e.summary}</TableCell>
                                    <TableCell>{e.startDate}</TableCell>
                                    <TableCell>{e.endDate}</TableCell>
                                    <TableCell><DeleteIcon onClick={() => this.dialogToDelete(e)} style={{ cursor: 'pointer' }} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()} maxWidth="md" fullWidth={true}>
                    {this.state.selection === 'delete' && <TvSeriesDelete closeDialog={this.handleCloseDialog} toBeDeleted={this.state.toBeDeleted} />}
                    {this.state.selection === 'update' && <UpdateTvSeries toBeUpdated={this.state.toBeUpdated} handleClose={this.handleCloseDialog} />}
                </Dialog>
            </Box>
        );
    }
}
export default ListAllTvSeries;