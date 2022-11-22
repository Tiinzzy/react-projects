import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { getData, getColumns } from './functions'

const gridStyle = {
    height: 600
}

class DisplayGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: [],
            dialogOpen: false,
            clickedRow: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        let data = await getData();

        let columns = getColumns(data[0]);

        let id = 1;
        let category = 'None';

        for (var k in data) {
            data[k].id = id;
            data[k].category = category;
            id += 1;
        }

        columns.unshift({ field: 'id', headerName: 'Id' });
        columns.push({ field: 'category', headerName: 'Category' });

        this.setState({ rows: data, columns: columns });
    }

    handleClick(e) {
        this.setState({ dialogOpen: true, clickedRow: e.row });
        console.log(this.state.clickedRow);
    }

    handleCloseDialog() {
        this.setState({ dialogOpen: false })
    }

    render() {
        return (
            <>
                <Box>
                    <DataGrid
                        style={gridStyle}
                        hideFooterPagination={true}
                        hideFooter={true}
                        rows={this.state.rows}
                        columns={this.state.columns}
                        onCellDoubleClick={(e) => this.handleClick(e)}
                    />

                    {this.state.dialogOpen && <Dialog onClose={(e) => this.handleCloseDialog(e)} open={this.state.dialogOpen} maxWidth='sm' fullWidth={true}>
                        <DialogTitle>Details</DialogTitle>
                        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginLeft: 30, paddingBottom: 10 }}>
                            <Typography>
                                Id: {this.state.clickedRow.id}
                            </Typography>

                            <Typography>  Date: {this.state.clickedRow.DATE}
                            </Typography>

                            <Typography>  Description: {this.state.clickedRow.DESC}
                            </Typography>

                            <Typography>  Amount: ${this.state.clickedRow.AMONT}
                            </Typography>

                            <Typography>  Category: {this.state.clickedRow.category}
                            </Typography>
                        </Box>

                    </Dialog>}

                </Box>

            </>
        );
    }
}
export default DisplayGrid;