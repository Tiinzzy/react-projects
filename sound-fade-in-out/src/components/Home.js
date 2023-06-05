import React from "react";

import LeftAudio from "./LeftAudio";
import RightAudio from "./RightAudio";
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import Forward5Icon from '@mui/icons-material/Forward5';
import Forward10Icon from '@mui/icons-material/Forward10';
import Forward30Icon from '@mui/icons-material/Forward30';
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
            rightButtonName: 'Play',
            beatBoxTHeme: 'light-box',
            checkedBoxStatus: '',
            checkedLeft: false,
            checkedRight: false
        }
        this.callBack = this.callBack.bind(this);
    }

    componentDidMount() {
        styleEventEmitter.on('settingStyle', (data) => {
            this.setState({ beatBoxTHeme: data.className + '-box', themeName: data.className, audioTheme: data.className + '-audio' });
        })
    }

    playBothAudio5() {
        let steps = 0.05;
        if (this.state.buttonName === "Play" && this.state.checkedBoxStatus === 'left') {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Play" && this.state.checkedBoxStatus === 'right') {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Play', callBack: this.callBack });
        }
    }

    playBothAudio1() {
        let steps = 0.1;
        if (this.state.buttonName === "Play" && this.state.checkedBoxStatus === 'left') {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Play" && this.state.checkedBoxStatus === 'right') {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Play', callBack: this.callBack });
        }
    }

    playBothAudio3() {
        let steps = 0.3;
        if (this.state.buttonName === "Play" && this.state.checkedBoxStatus === 'left') {
            eventEmitter.emit('leftPlayer', { goto: 0, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayer', { goto: 1, steps, message: 'Play', callBack: this.callBack });
        } else if (this.state.buttonName === "Play" && this.state.checkedBoxStatus === 'right') {
            eventEmitter.emit('leftPlayerBack', { goto: 1, steps, message: 'Play', callBack: this.callBack });
            eventEmitter.emit('rightPlayerBack', { goto: 0, steps, message: 'Play', callBack: this.callBack });
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

    checkedBox(e, i) {
        if (i === 'left') {
            this.setState({ checkedLeft: e.target.checked, checkedBoxStatus: i });
        } else if (i === 'right') {
            this.setState({ checkedRight: e.target.checked, checkedBoxStatus: i });
        } else {
            this.setState({ checkedRight: false, checkedBoxStatus: '', checkedLeft: false });
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
                        <div className={this.state.audioTheme} style={{ marginRight: 50 }}>
                            <LeftAudio />
                        </div>
                        <div className={this.state.audioTheme} style={{ marginLeft: 50 }}>
                            <RightAudio />
                        </div>
                    </div>
                    <div className={this.state.themeName && this.state.beatBoxTHeme}
                        style={{ minWidth: 800, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <FormControlLabel control={<Checkbox checked={this.state.checkedLeft} onChange={(e) => this.checkedBox(e, 'left')} disabled={this.state.checkedRight === true} />}
                            label="Left to Right" style={{ color: this.state.themeName === 'light' ? 'black' : '#4a4a4a' }} />
                        <FormControlLabel control={<Checkbox checked={this.state.checkedRight} onChange={(e) => this.checkedBox(e, 'right')} disabled={this.state.checkedLeft === true} />}
                            style={{ color: this.state.themeName === 'light' ? 'black' : '#4a4a4a' }} label="Right to Left" />
                        <div>
                            <Tooltip title="Speed 0.05" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBothAudio5(0.05)} color="primary" >
                                    {this.state.buttonName === "Play" && <Forward5Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Speed 0.1" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBothAudio1(0.1)} color="primary" >
                                    {this.state.buttonName === "Play" && <Forward10Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="Speed 0.3" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playBothAudio3(0.3)} color="primary" >
                                    {this.state.buttonName === "Play" && <Forward30Icon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div style={{ marginRight: 10 }}>
                            <Tooltip title="Play Left Audio" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playLeftAudio()} color="primary" >
                                    {this.state.leftButtonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                            <Typography variant="body1" fontSize="9px" style={{ color: this.state.themeName === 'light' ? 'black' : '#4a4a4a' }}>Left Audio</Typography>
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <Tooltip title="Play Right Audio" placement="top">
                                <IconButton aria-label="delete" onClick={() => this.playRightAudio()} color="primary" >
                                    {this.state.rightButtonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                                </IconButton>
                            </Tooltip>
                            <Typography variant="body1" fontSize="9px" style={{ color: this.state.themeName === 'light' ? 'black' : '#4a4a4a' }}>Right Audio</Typography>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}
export default Home;