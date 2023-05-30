import React from "react";

import LeftAudio from "./LeftAudio";
import RightAudio from "./RightAudio";
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';

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
            const data = { message: 'Play', callBack: this.callBack };
            eventEmitter.emit('customEvent', data);
        } else if (this.state.buttonName === "Pause") {
            const data = { message: 'Pause', callBack: this.callBack };
            eventEmitter.emit('customEvent', data);
        }
    }

    callBack(data) {
        if (data && data === 'Pause') {
            this.setState({ buttonName: 'Pause' })
        } else if (data && data === 'Play') {
            this.setState({ buttonName: 'Play' })
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
                <IconButton aria-label="delete" onClick={() => this.playBothAudio()} color="primary" >
                    {this.state.buttonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                </IconButton>
            </>
        );
    }
}
export default Home;