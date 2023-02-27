import React from "react";

import Box from '@mui/material/Box';

import BackEndConnection from './BackEndConnection';

import './style.css'

const backend = BackEndConnection.INSTANCE();

export default class DialogPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            secret: props.secret,
            status: props.status

        }
    }

    render() {
        return (
            <Box style={{ height: 20, widht: 200, padding: 20 }}>
                {this.state.status === 'logged-out' && 'you need to login to see the secret!'}
                {this.state.secret && this.state.secret}
            </Box>
        );
    }
};