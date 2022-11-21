import React from "react";

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import { getData } from './ParseCsv'

class CsvGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    async componentDidMount() {
        let data = await getData();
        console.log(data);
    }

    render() {
        return (
            <>
                <Box>

                </Box>

            </>
        );
    }
}
export default CsvGrid;