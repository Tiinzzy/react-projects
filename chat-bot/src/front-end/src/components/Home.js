import React from "react";

import { Box } from "@mui/material";

import ChatBox from "./ChatBox";

const homeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
    padding: 20,
    height: '90%'
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Box style={homeStyle}>
                    <ChatBox />
                </Box>
            </>
        );
    }
};