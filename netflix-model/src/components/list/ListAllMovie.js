import React from "react";

import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';

import MovieDelete from "../delete/MovieDelete";
import UpdateMovie from '../edit/UpdateMovie';

import EventEmitter from 'eventemitter3';

export const movieUpdate = new EventEmitter();

class ListAllMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: props.movieData,
            openDialog: false
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    dialogToDelete(e) {
        this.setState({ openDialog: true, toBeDeleted: e, selection: 'delete' })
    }

    handleCloseDialog(e) {
        if (e) {
            this.setState({ openDialog: false }, () => {
                if (e === 'reload movie') {
                    movieUpdate.emit('update', { task: 'update' });
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
                                <TableCell>Movie Title</TableCell>
                                <TableCell>Release Date</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.movieData.map((e, i) => (
                                <TableRow
                                    onDoubleClick={() => this.openEdit(e)}
                                    hover
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="e">
                                        {e.oid}
                                    </TableCell>
                                    <TableCell>{e.movieTitle}</TableCell>
                                    <TableCell>{e.releaseDate}</TableCell>
                                    <TableCell>{e.rating}</TableCell>
                                    <TableCell><DeleteIcon onClick={() => this.dialogToDelete(e)} style={{ cursor: 'pointer' }} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()}>
                    {this.state.selection === 'delete' && <MovieDelete closeDialog={this.handleCloseDialog} toBeDeleted={this.state.toBeDeleted} />}
                    {this.state.selection === 'update' && <UpdateMovie toBeUpdated={this.state.toBeUpdated} handleClose={this.handleCloseDialog} />}
                </Dialog>
            </Box>
        );
    }
}
export default ListAllMovie;