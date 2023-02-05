import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import './style.css';


class OutcomeDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            outcomeMessage: props.outcomeMessage,
            showSad: false,
            showCongratulations: false

        }
    }
    componentDidMount() {
        if (this.state.outcomeMessage === 'Draw Result!') {
            this.setState({ showSad: true });
        } else if (this.state.outcomeMessage === 'Computer Wins!' || this.state.outcomeMessage === 'User Wins!') {
            this.setState({ showCongratulations: true });
        }
    }

    render() {
        return (
            <Box className="DialogContent">
                {this.state.showCongratulations === true && <CelebrationIcon fontSize="large" style={{ marginRight: 30 }} />}
                <Typography variant="h3" fontSize={25}>{this.state.outcomeMessage}</Typography>
                {this.state.showSad === true && <SentimentVeryDissatisfiedIcon fontSize="large" style={{ marginLeft: 30 }} />}
                {this.state.showCongratulations === true && <CelebrationIcon className="CelbrateImg" fontSize="large" style={{ marginLeft: 30 }} />}
            </Box>
        );
    }
}
export default OutcomeDialog;    