import React from "react";

import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

class ListAllSubscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptionData: props.subscriptionData
        }
    }

    componentDidMount() {
        console.log(this.state.subscriptionData);
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.subscriptionData.map((e, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="e">
                                        {e.oid}
                                    </TableCell>
                                    <TableCell>{e.subscriptionType}</TableCell>
                                    <TableCell>{e.price}</TableCell>
                                    <TableCell>{e.expiryDate}</TableCell>
                                    <TableCell>{e.subscriptionDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}
export default ListAllSubscription;