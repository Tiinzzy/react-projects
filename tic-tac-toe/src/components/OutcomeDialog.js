import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CelebrationIcon from '@mui/icons-material/Celebration';

import './style.css';


class OutcomeDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            outcomeMessage: props.outcomeMessage

        }
    }


    render() {
        return (
            <Box className="DialogContent">
                <CelebrationIcon fontSize="large" style={{ marginRight: 30 }} />
                <Typography variant="h3" fontSize={25}>{this.state.outcomeMessage}</Typography>
                <CelebrationIcon className="CelbrateImg" fontSize="large" style={{ marginLeft: 30 }} />
            </Box>
        );
    }
}
export default OutcomeDialog;    