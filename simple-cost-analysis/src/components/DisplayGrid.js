import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

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
        // console.log(data);

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


        // console.log(columns);

        this.setState({ rows: data, columns: columns });
        // console.log(rows);
    }

    handleClick(d, e) {
        this.setState({ dialogOpen: true, clickedRow: d.row });
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
                        onCellDoubleClick={(d, e) => this.handleClick(d, e)}
                    />

                    {this.state.dialogOpen && <Dialog onClose={(e) => this.handleCloseDialog(e)} open={this.state.dialogOpen} maxWidth='sm' fullWidth={true}>
                        <DialogTitle>Details</DialogTitle>
                        {/* {this.state.clickedRow} */}
                    </Dialog>}

                </Box>

            </>
        );
    }
}
export default DisplayGrid;