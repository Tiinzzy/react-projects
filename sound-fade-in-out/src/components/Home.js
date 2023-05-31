import React from "react";

import LeftAudio from "./LeftAudio";
import RightAudio from "./RightAudio";
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

import EventEmitter from 'eventemitter3';

export const eventEmitter = new EventEmitter();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonName: 'Play'
        }
        this.callBack = this.callBack.bind(this);
    }

    playBothAudio() {
        if (this.state.buttonName === "Play") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps: 10, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps: 10, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Pause") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps: 10, message: 'Pause', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps: 10, message: 'Pause', callBack: this.callBack });
        }
    }

    callBack(data) {
        if (data && data === 'Pause') {
            this.setState({ buttonName: 'Pause' });
        } else if (data && data === 'Play') {
            this.setState({ buttonName: 'Play' });
        }
    }

    render() {
        return (
            <>
                <div style={{ width: '100%', marginTop: 50 }}>
                    <div style={{ minWidth: 800, width: '100%', display: 'flex', flexDirection: 'row', height: '400px' }}>
                        <Tooltip title="Fade Out" placement="top-start">
                            <div style={{ width: '50%', border: 'dotted 5px #145490', alignItems: 'center', justifyContent: 'center', display: 'flex', marginRight: 50 }}>
                                <LeftAudio />
                            </div>
                        </Tooltip>
                        <Tooltip title="Fade In" placement="top-start">
                            <div style={{ width: '50%', border: 'dotted 5px #145490', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: 50 }}>
                                <RightAudio />
                            </div>
                        </Tooltip>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '200px', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title="Fade In-n-Out" placement="top">
                            <IconButton aria-label="delete" onClick={() => this.playBothAudio()} color="primary" >
                                {this.state.buttonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                            </IconButton>
                        </Tooltip>
                        <Typography variant="body1">Fade in-n-out Button</Typography>
                    </div>
                </div>
            </>
        );
    }
}
export default Home;