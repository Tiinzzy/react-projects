import React from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';

import { eventEmitter } from './Home';
import { styleEventEmitter } from './Header';

var a;

class LeftAudio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSound: null,
            fileName: '',
            selectFile: 'No File Chosen',
            buttonName: 'Play',
            volumeValue: 1,
            buttonDisabled: true,
            audioPlayerTheme: 'light-audio-player'
        }
    }

    componentDidMount() {
        eventEmitter.on('leftPlayer', (data) => {
            if (data.message === 'Play' && data.goto === 0 && this.state.audioSound !== null) {
                this.setState({ volumeValue: 1, buttonName: 'Pause' }, () => {
                    a.volume = this.state.volumeValue;
                    this.state.audioSound.play();
                    data.callBack('Pause');
                });
                let timerHandle = setInterval(() => {
                    let volumeValue = this.state.volumeValue - data.steps;
                    volumeValue = volumeValue <= 0 ? 0 : volumeValue;
                    this.setState({ volumeValue }, function () {
                        a.volume = this.state.volumeValue;
                        if (this.state.volumeValue <= 0) {
                            clearInterval(timerHandle);
                        }
                    });
                }, 1000);
            } else if (data.message === 'Pause') {
                this.setState({ buttonName: "Play" }, () => {
                    this.state.audioSound.pause();
                    this.setState({ buttonName: 'Play' });
                    data.callBack('Play');
                });
            }
        });

        eventEmitter.on('leftPlayerBack', (data) => {
            if (data.message === 'Play' && data.goto === 1 && this.state.audioSound !== null) {
                this.setState({ volumeValue: 0, buttonName: 'Pause' }, () => {
                    a.volume = this.state.volumeValue;
                    this.state.audioSound.play();
                    data.callBack('Pause');
                });
                let timerHandle = setInterval(() => {
                    let volumeValue = this.state.volumeValue + data.steps;
                    volumeValue = volumeValue >= 1 ? 1 : volumeValue;
                    this.setState({ volumeValue }, function () {
                        a.volume = this.state.volumeValue;
                        if (this.state.volumeValue <= 0) {
                            clearInterval(timerHandle);
                        }
                    });
                }, 1000);
            } else if (data.message === 'Pause') {
                this.setState({ buttonName: "Play" }, () => {
                    this.state.audioSound.pause();
                    this.setState({ buttonName: 'Play' });
                    data.callBack('Play');
                });
            }
        });

        eventEmitter.on('leftAudioPlayer', (data) => {
            if (data.message === 'Play' && this.state.audioSound !== null) {
                this.setState({ volumeValue: 1, buttonName: 'Pause' }, () => {
                    a.volume = 1;
                    this.state.audioSound.play();
                    data.callBack('Pause Left');
                });
            } else if (data.message === 'Pause') {
                this.setState({ buttonName: "Play" }, () => {
                    this.state.audioSound.pause();
                    this.setState({ buttonName: 'Play' });
                    data.callBack('Play Left');
                });
            }
        });

        styleEventEmitter.on('settingStyle', (data) => {
            this.setState({ audioPlayerTheme: data.className + '-audio-player' });
        });
    }

    getAudio(e) {
        if (e) {
            let audio = URL.createObjectURL(e.target.files[0]);
            this.setState({ audioSound: audio, fileName: e.target.files[0].name, selectFile: '' }, () => {
                a = new Audio(this.state.audioSound);
                this.setState({ buttonDisabled: false, audioSound: a });
            });
        }
    }

    handlePlayAudio() {
        if (this.state.buttonName === "Play") {
            this.state.audioSound.play();
            this.setState({ buttonName: 'Pause' });
        } else {
            this.state.audioSound.pause();
            this.setState({ buttonName: 'Play' });
        }
    }

    handleChangeVolume(e, newVolume) {
        if (this.state.audioSound !== null) {
            this.setState({ volumeValue: newVolume }, () => {
                a.volume = this.state.volumeValue;
            });
        }
    }

    componentWillUnmount() {
        eventEmitter.off('customEvent');
        styleEventEmitter.off('settingStyle');
    }

    render() {
        return (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column', marginTop: 20, marginBottom: 20, width: 500 }}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', width: 300 }}>
                    <Button variant="contained" component="label">
                        Choose File
                        <input hidden type="file"
                            accept="audio/mp3,audio/*;capture=microphone"
                            onChange={(e) => this.getAudio(e)} />
                    </Button>
                    <Typography variant="body1" ml={2}>{this.state.selectFile}</Typography>
                </Box>
                <Box style={{ width: 500, marginTop: 30, marginBottom: 30 }}>
                    <Typography variant="body1">{this.state.fileName}</Typography>
                </Box>
                <Box className={this.state.audioPlayerTheme} >
                    <IconButton aria-label="delete" onClick={() => this.handlePlayAudio()} color="primary" disabled={this.state.buttonDisabled}>
                        {this.state.buttonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                    </IconButton>
                    <Stack spacing={2} direction="row" sx={{ ml: 1, mr: 2 }} alignItems="center" style={{ width: 250 }}>
                        <VolumeDown color="tertiary" />
                        <Slider step={0.1}
                            max={1.0}
                            min={0.0}
                            aria-label="Volume"
                            value={this.state.volumeValue} onChange={(e, i) => this.handleChangeVolume(e, i)} />
                        <VolumeUp ml={1} color="tertiary" />
                    </Stack>
                </Box>
            </Box>
        );
    }
}
export default LeftAudio;