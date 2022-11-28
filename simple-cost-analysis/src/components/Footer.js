import React from "react";

import Box from '@mui/material/Box';

import './design.css';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Box className="FooterBox">
                    Proudly designed by Tina Vatanabadi, Copyright 2022.
                </Box>
            </>
        );
    }
}
export default Footer;