import React from "react";

import Box from '@mui/material/Box';

import './style.css';

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <Box>
                this will be side bar content
            </Box>
        );
    }
}