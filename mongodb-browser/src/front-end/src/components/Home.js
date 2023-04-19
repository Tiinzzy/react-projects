import React from "react";

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';

import Connection from "./Connection";

import './style.css';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: true
        }
        this.handleCLoseDialog = this.handleCLoseDialog.bind(this);
    }

    handleCLoseDialog(callback) {
        if (callback && callback.action === 'connect-and-close') {
            this.setState({ openDialog: false });
        }
    }

    render() {
        return (
            <Box className="home-page-main-box">
                <Box className="left-side-bar">

                </Box>
                <Box className="right-side-box">

                </Box>
                <Dialog maxWidth="md" open={this.state.openDialog} onClose={() => this.handleCLoseDialog()}>
                    <Connection handleCLoseDialog={this.handleCLoseDialog} />
                </Dialog>
            </Box>
        );
    }
}