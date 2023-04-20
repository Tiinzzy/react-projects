import React from "react";

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';

import Connection from "./Connection";
import SideBar from "./SideBar";
import DocumentsDisplay from "./DocumentsDisplay";

import './style.css';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: true,
            componentReady: false,
            dataReady: false
        }
        this.handleCLoseDialog = this.handleCLoseDialog.bind(this);
        this.getDataforDocuments = this.getDataforDocuments.bind(this);
    }

    handleCLoseDialog(callback) {
        if (callback && callback.action === 'connect-and-close') {
            this.setState({ openDialog: false, connectionInfo: callback.info }, () => {
                this.setState({ componentReady: true });
            });
        }
    }

    getDataforDocuments(data) {
        if (data && data.action === 'ready-to-fetch') {
            this.setState({ database: data.database, collection: data.collection }, () => {
                this.setState({ dataReady: true });
            })
        }
    }

    render() {
        return (
            <Box className="home-page-main-box">
                <Box className="left-side-bar">
                    {this.state.componentReady &&
                        <SideBar connectionInfo={this.state.connectionInfo} getDataforDocuments={this.getDataforDocuments} />}
                </Box>
                <Box className="right-side-box">
                    {this.state.componentReady && this.state.dataReady &&
                        <DocumentsDisplay collection={this.state.collection} database={this.state.database} />}
                </Box>
                <Dialog maxWidth="md" open={this.state.openDialog} onClose={() => this.handleCLoseDialog()}>
                    <Connection handleCLoseDialog={this.handleCLoseDialog} />
                </Dialog>
            </Box>
        );
    }
}