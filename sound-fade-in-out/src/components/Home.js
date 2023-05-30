import React from "react";

import LeftAudio from "./LeftAudio";
import RightAudio from "./RightAudio";
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import Typography from "@mui/material/Typography";

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
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '500px' }}>
                    <div style={{ width: '50%', border: 'dotted 5px #145490', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <LeftAudio />
                    </div>
                    <div style={{
                        width: '50%', borderTop: 'dotted 5px #145490', borderBottom: 'dotted 5px #145490', borderRight: 'dotted 5px #145490',
                        alignItems: 'center', justifyContent: 'center', display: 'flex'
                    }}>
                        <RightAudio />
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '200px', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1">Select two separate audios and click play button</Typography>
                    <IconButton aria-label="delete" onClick={() => this.playBothAudio()} color="primary" >
                        {this.state.buttonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                    </IconButton>
                </div>
            </>
        );
    }
}
export default Home;