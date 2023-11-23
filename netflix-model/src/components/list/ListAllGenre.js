import React from "react";

import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';

import GenreDelete from "../delete/GenreDelete";
import UpdateGenre from "../edit/UpdateGenre";

import EventEmitter from 'eventemitter3';

export const genreUpdate = new EventEmitter();

class ListAllGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genreData: props.genreData,
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
                if (e === 'reload genre') {
                    genreUpdate.emit('update', { task: 'update' });
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
                                <TableCell>Description</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.genreData.map((e, i) => (
                                <TableRow
                                    onDoubleClick={() => this.openEdit(e)}
                                    hover
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="e">{e.oid} </TableCell>
                                    <TableCell>{e.description}</TableCell>
                                    <TableCell><DeleteIcon onClick={() => this.dialogToDelete(e)} style={{ cursor: 'pointer' }} /></TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()}>
                    {this.state.selection === 'delete' && <GenreDelete closeDialog={this.handleCloseDialog} toBeDeleted={this.state.toBeDeleted} />}
                    {this.state.selection === 'update' && <UpdateGenre toBeUpdated={this.state.toBeUpdated} handleClose={this.handleCloseDialog} />}
                </Dialog>
            </Box>
        );
    }
}
export default ListAllGenre;