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
        this.refreshGrid = this.refreshGrid.bind(this);
    }

    componentDidMount() {
        this.setState({ setRefereshGrid: this.refreshGrid });
        this.refreshGrid(this.state.jCsv);
    }

    refreshGrid(jCsv) {
        let data = jCsv;
        if (typeof data === 'object') {
            data = Object.values(data);
        }
        if (data && data.length > 0) {
            let columns = getColumns(data[0]);
            this.setState({ rows: data, columns, jCsv });
        }
    }

    render() {
        return (
            <>
                <Box style={{ width: 850, marginTop: 20, marginRight: 20 }}>
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