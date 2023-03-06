import React from "react";

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BackEndConnection from '../tools/BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <Box className="WholePageBox">
                this is a test
            </Box>
        );
    }
};