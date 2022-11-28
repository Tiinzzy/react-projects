import React from "react";

import Box from '@mui/material/Box';

import './design.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Box className="HomeBox">
                    this will be home section
                </Box>
            </>
        );
    }
}
export default Home;