import React from "react";

import Box from "@mui/material/Box";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class TvSeriesDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Box style={{ width: '500px' }}>
                delete!
            </Box>
        );
    }
}
export default TvSeriesDelete;