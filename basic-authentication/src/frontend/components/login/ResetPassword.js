import React from "react";

import Box from '@mui/material/Box';

import BackEndConnection from '../tools/BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restId: props.restId
        }
        console.log(this.state.restId);
    }

    render() {
        return (
            <Box id='reset-password' className="WholePageBox">
                "Welcome to reset password"
            </Box>
        );
    }
};