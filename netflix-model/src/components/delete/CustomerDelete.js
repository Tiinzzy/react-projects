import React from "react";

import Box from '@mui/material/Box';

class CustomerDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeDialog: props.closeDialog,
            toBeDeleted: props.toBeDeleted
        }
    }

    render() {
        return (
            <Box>

            </Box>
        );
    }
}
export default CustomerDelete;