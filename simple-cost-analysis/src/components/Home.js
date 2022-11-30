import React from "react";

import Box from '@mui/material/Box';
import DisplayGrid from "./DisplayGrid";

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
                <DisplayGrid />
                </Box>
            </>
        );
    }
}
export default Home;