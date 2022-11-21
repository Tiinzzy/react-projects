import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { getData, getColumns } from './functions'

class DisplayGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: []
        }
    }

    async componentDidMount() {
        let data = await getData();
        let columns = getColumns(data[0]);
        // console.log(data);
        // console.log(columns);

        let rows = [];
        let id = 1;
        let category = '';

        for (var k in data) {
            let value = data[k];
            for (let i in value) {
                data[k].id = id;
                id += 1;
                data[k].category = category;
                rows.push(value[i])
            }
            console.log(data[k])
        }
        // console.log(rows);

        this.setState({ rows: rows, columns: columns });
    }

    getColumns() {

    }

    render() {
        return (
            <>
                <Box>
                    {/* <DataGrid
                        height="500 px"
                        hideFooterPagination={true}
                        hideFooter={true}
                        rows={this.state.rows}
                        columns={this.state.columns}
                    /> */}
                </Box>

            </>
        );
    }
}
export default DisplayGrid;