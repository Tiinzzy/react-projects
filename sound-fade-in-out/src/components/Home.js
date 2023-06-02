import React from "react";

import LeftAudio from "./LeftAudio";
import RightAudio from "./RightAudio";
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import Forward5Icon from '@mui/icons-material/Forward5';
import Forward10Icon from '@mui/icons-material/Forward10';
import Forward30Icon from '@mui/icons-material/Forward30';
import Replay5Icon from '@mui/icons-material/Replay5';
import Replay10Icon from '@mui/icons-material/Replay10';
import Replay30Icon from '@mui/icons-material/Replay30';
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

import EventEmitter from 'eventemitter3';

import { styleEventEmitter } from './Header';

import './style.css';

export const eventEmitter = new EventEmitter();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonName: 'Play',
            themeName: 'light',
            audioTheme: 'light-audio',
            leftButtonName: 'Play',
            rightButtonName: 'Play'
        }
        this.callBack = this.callBack.bind(this);
    }

    componentDidMount() {
        styleEventEmitter.on('settingStyle', (data) => {
            this.setState({ themeName: data.className, audioTheme: data.className + '-audio' });
        })
    }

    playBothAudio5() {
        let steps = 0.05;
        if (this.state.buttonName === "Play") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Pause") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Pause', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Pause', callBack: this.callBack });
        }
    }

    playBothAudio1() {
        let steps = 0.1;
        if (this.state.buttonName === "Play") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Pause") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Pause', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Pause', callBack: this.callBack });
        }
    }

    playBothAudio3() {
        let steps = 0.3;
        if (this.state.buttonName === "Play") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Pause") {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Pause', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Pause', callBack: this.callBack });
        }
    }

    playBackhAudio5(){
        let steps = 0.05;
        if (this.state.buttonName === "Play") {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Pause") {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Pause', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Pause', callBack: this.callBack });
        }
    }

    playBackhAudio1(){
        let steps = 0.1;
        if (this.state.buttonName === "Play") {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Pause") {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Pause', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Pause', callBack: this.callBack });
        }
    }

    playBackAudio3(){
        let steps = 0.3;
        if (this.state.buttonName === "Play") {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Pause") {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Pause', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Pause', callBack: this.callBack });
        }
    }

    playLeftAudio() {
        if (this.state.leftButtonName === "Play") {
            eventEmitter.emit('leftAudioPlayer', { message: 'Play', callBack: this.callBack });
        } else if (this.state.leftButtonName === "Pause") {
            eventEmitter.emit('leftAudioPlayer', { message: 'Pause', callBack: this.callBack });
        }
    }

    playRightAudio() {
        if (this.state.rightButtonName === "Play") {
            eventEmitter.emit('rightAudioPlayer', { message: 'Play', callBack: this.callBack });
        } else if (this.state.rightButtonName === "Pause") {
            eventEmitter.emit('rightAudioPlayer', { message: 'Pause', callBack: this.callBack });
        }
    }

    callBack(data) {
        if (data && data === 'Pause') {
            this.setState({ buttonName: 'Play', leftButtonName: 'Pause', rightButtonName: 'Pause' });
        } else if (data === 'Pause Left') {
            this.setState({ leftButtonName: 'Pause' });
        } else if (data === 'Play Left') {
            this.setState({ leftButtonName: 'Play' });
        } else if (data === 'Play Right') {
            this.setState({ rightButtonName: 'Play' });
        } else if (data === 'Pause Right') {
            this.setState({ rightButtonName: 'Pause' });
        }
    }

    componentWillUnmount() {
        styleEventEmitter.off('settingStyle');
    }

    render() {
        return (
            <>
                <div className={this.state.themeName} style={{ width: '100%', marginTop: 50, height: 678 }}>
                    <div style={{ minWidth: 800, width: '100%', display: 'flex', flexDirection: 'row', height: '400px' }}>
                        <Tooltip title="Fade Out" placement="top-start">
                            <div className={this.state.audioTheme} style={{ marginRight: 50 }}>
                                <LeftAudio />
                            </div>
                        </Tooltip>
                        <Tooltip title="Fade In" placement="top-start">
                            <div className={this.state.audioTheme} style={{ marginLeft: 50 }}>
                                <RightAudio />
                            </div>
                        </Tooltip>
                    </div>
                    <div className={this.state.themeName}
                        style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', paddingTop: 40, border: 'solid 1px red', marginTop: 20 }}>
                        <div>
                            <Tooltip title="Speed 0.05" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBothAudio5()} color="primary" >
                                    {this.state.buttonName === "Play" && <Forward5Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Speed 0.1" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBothAudio1()} color="primary" >
                                    {this.state.buttonName === "Play" && <Forward10Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Speed 0.3" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBothAudio3()} color="primary" >
                                    {this.state.buttonName === "Play" && <Forward30Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Play Left Audio" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playLeftAudio()} color="primary" >
                                    {this.state.leftButtonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Play Right Audio" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playRightAudio()} color="primary" >
                                    {this.state.rightButtonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Speed 0.05" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBackhAudio5()} color="primary" >
                                    {this.state.buttonName === "Play" && <Replay5Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Speed 0.1" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBackhAudio1()} color="primary" >
                                    {this.state.buttonName === "Play" && <Replay10Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Speed 0.3" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBackAudio3()} color="primary" >
                                    {this.state.buttonName === "Play" && <Replay30Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>

                    </div>
                </div >
            </>
        );
    }
}
export default Home;