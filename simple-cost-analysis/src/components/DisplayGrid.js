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
        let columns = getColumns(data[0]);
        //console.log(data);
        // console.log(columns);

        let rows = [];
        let id = 0;
        let category = '';

        for (var k in data) {
            let value = data[k];
            for (let i in value) {
                let val = value[i];
                data[k].id = id;
                id += 1;
                data[k].category = category;
                rows.push({ key: i, val, id, category })
            }
        }
        this.setState({ rows: rows, columns: columns });
        console.log(rows);
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