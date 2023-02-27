import React from "react";

import Box from '@mui/material/Box';

import './style.css'

export default class DialogPopUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            secret: props.secret,
            status: props.status,
            data: props.data

        }
    }

    render() {
        return (
            <Box style={{ height: 20, widht: 200, padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {this.state.status === 'logged-out' && 'Secrete: ' + this.state.data}
                {this.state.secret && this.state.secret}
            </Box>
        );
    }
};