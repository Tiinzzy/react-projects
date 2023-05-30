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
            buttonDisabled: true
        }
    }

    componentDidMount() {
        eventEmitter.on('customEvent', (data) => {
            if (data.message === 'Play' && this.state.audioSound !== null) {
                this.setState({ buttonName: "Play" }, () => {
                    this.state.audioSound.play();
                    this.setState({ buttonName: 'Pause' });
                    data.callBack('Pause');
                })
            } else if (data.message === 'Pause' && this.state.audioSound !== null) {
                this.setState({ buttonName: "Pause" }, () => {
                    this.state.audioSound.pause();
                    this.setState({ buttonName: 'Play' });
                    data.callBack('Play');
                })
            }
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
        eventEmitter.off('customEvent', (data) => { });
    }

    render() {
        return (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column', marginTop: 20, marginBottom: 20 }}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 300 }}>
                    <Button variant="contained" component="label">
                        Choose File
                        <input hidden type="file"
                            accept="audio/mp3,audio/*;capture=microphone"
                            onChange={(e) => this.getAudio(e)} />
                    </Button>
                    <Typography variant="body1" ml={2}>{this.state.selectFile}</Typography>
                </Box>
                <Typography variant="body1" mt={2} mb={2}>{this.state.fileName}</Typography>

                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton aria-label="delete" onClick={() => this.handlePlayAudio()} color="primary" disabled={this.state.buttonDisabled}>
                        {this.state.buttonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon fontSize="large" /> : <PauseCircleOutlinedIcon fontSize="large" />}
                    </IconButton>
                    <Stack spacing={2} direction="row" sx={{ ml: 1 }} alignItems="center" style={{ width: 250 }}>
                        <VolumeDown />
                        <Slider step={0.1}
                            max={1.0}
                            min={0.0}
                            aria-label="Volume"
                            value={this.state.volumeValue} onChange={(e, i) => this.handleChangeVolume(e, i)} />
                        <VolumeUp />
                    </Stack>

                </Box>
            </Box>
        );
    }
}
export default LeftAudio;