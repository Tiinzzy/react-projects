import React from "react";

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';

import Connection from "./Connection";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: true
        }
    }

    handleCLoseDialog() {
        this.setState({ openDialog: false });
    }

    render() {
        return (
            <Box>
                <Dialog open={this.state.openDialog} onClose={() => this.handleCLoseDialog()}>
                    <Connection />
                </Dialog>
            </Box>
        );
    }
}