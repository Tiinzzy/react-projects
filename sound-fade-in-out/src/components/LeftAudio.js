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

var a;

class LeftAudio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSound: null,
            fileName: 'No File Chosen',
            buttonName: 'Play',
            volumeValue: 0
        }
    }

    getAudio(e) {
        if (e) {
            let audio = URL.createObjectURL(e.target.files[0]);
            this.setState({ audioSound: audio, fileName: e.target.files[0].name }, () => {
                a = new Audio(this.state.audioSound);
                this.setState({ audioSound: a });
            });
        }
    }

    handleClick() {
        if (this.state.buttonName === "Play") {
            this.state.audioSound.play();
            this.setState({ buttonName: 'Pause' });
        } else {
            this.state.audioSound.pause();
            this.setState({ buttonName: 'Play' });
        }
    }

    handleChangeVolume(event, newValue) {
        console.log(newValue)
        this.setState({ volumeValue: newValue }, () => {
            a.volume = this.state.volumeValue;
        });
    }

    render() {
        return (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, flexDirection: 'column', marginTop: 20, marginBottom: 20 }}>
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="contained" component="label">
                        Choose File
                        <input hidden type="file"
                            accept="audio/mp3,audio/*;capture=microphone"
                            onChange={(e) => this.getAudio(e)} />
                    </Button>
                    <Typography variant="body1" ml={1}>{this.state.fileName}</Typography>
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <IconButton aria-label="delete" onClick={() => this.handleClick()}>
                        {this.state.buttonName === "Play" ? <PlayCircleFilledWhiteOutlinedIcon /> : <PauseCircleOutlinedIcon />}
                    </IconButton>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center" style={{ width: 250 }}>
                        <VolumeDown />
                        <Slider aria-label="Volume" value={this.state.volumeValue} onChange={(e, i) => this.handleChangeVolume(e, i)} />
                        <VolumeUp />
                    </Stack>

                </Box>
            </Box>
        );
    }
}
export default LeftAudio;