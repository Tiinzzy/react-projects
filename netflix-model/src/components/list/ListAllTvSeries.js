import React from "react";

import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

class ListAllTvSeries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tvseriesData: props.tvseriesData
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>OID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Summary</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tvseriesData.map((e, i) => (
                                <TableRow
                                    hover
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="e">{e.oid}</TableCell>
                                    <TableCell>{e.title}</TableCell>
                                    <TableCell>{e.summary}</TableCell>
                                    <TableCell>{e.startDate}</TableCell>
                                    <TableCell>{e.endDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }
}
export default ListAllTvSeries;