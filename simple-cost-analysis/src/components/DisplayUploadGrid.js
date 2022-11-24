import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { getColumns } from './functions';

const gridStyle = {
    height: 600
}

class DisplayUploadGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: [],
            jCsv: props.jCsv,
            refresh: null
        }
    }

    componentDidMount() {
        let data = this.state.jCsv;
        if (typeof data === 'object') {
            data = Object.values(data);
        }
        if (data && data.length > 0) {
            let columns = getColumns(data[0]);
            this.setState({ rows: data, columns: columns });
        }
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
                    />
                </Box>

            </>
        );
    }
}
export default DisplayUploadGrid;