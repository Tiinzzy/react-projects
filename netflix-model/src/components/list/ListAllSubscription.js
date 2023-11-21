import React from "react";

import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';

import SubscriptionDelete from "../delete/SubscriptionDelete";

class ListAllSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptionData: props.subscriptionData,
            openDialog: false
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    dialogToDelete(e) {
        this.setState({ openDialog: true, toBeDeleted: e })
    }

    handleCloseDialog() {
        this.setState({ openDialog: false })
    }

    render() {
        return (
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>OID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Expiry Date</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.subscriptionData.map((e, i) => (
                                <TableRow
                                    hover
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="e">
                                        {e.oid}
                                    </TableCell>
                                    <TableCell>{e.subscriptionType}</TableCell>
                                    <TableCell>{e.price}</TableCell>
                                    <TableCell>{e.expiryDate}</TableCell>
                                    <TableCell>{e.subscriptionDate}</TableCell>
                                    <TableCell><DeleteIcon onClick={() => this.dialogToDelete(e)} style={{ cursor: 'pointer' }} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()}>
                    <SubscriptionDelete closeDialog={this.handleCloseDialog} toBeDeleted={this.state.toBeDeleted} />
                </Dialog>
            </Box>
        );
    }
}
export default ListAllSubscription;