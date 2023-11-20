import React from "react";

import Box from '@mui/material/Box';

class DisplayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box style={{ border: 'solid 1px #eaeaea', marginLeft: 40, width: '90%', borderRadius: 6 }}>
                this is edit page
            </Box>
        );
    }
}
export default DisplayEdit;