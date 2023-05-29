import React from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

var a;

class LeftAudio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSound: null,
            fileName: 'No File Chosen',
            buttonName: 'Play'
        }
    }

    getAudio(e) {
        if (e) {
            let audio = URL.createObjectURL(e.target.files[0]);
            this.setState({ audioSound: audio, fileName: e.target.files[0].name }, () => {
                a = new Audio(this.state.audioSound);
                this.setState({audioSound: a});
            });
        }
    }

    handleClick() {
        console.log(this.state.buttonName)
        if (this.state.buttonName === "Play") {
            this.state.audioSound.play();
            this.setState({ buttonName: 'Pause' });
        } else {
            this.state.audioSound.pause();
            this.setState({ buttonName: 'Play' });
        }
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
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    {/* <audio id="sound" controls src={this.state.audioSound}></audio> */}
                    <button onClick={() => this.handleClick()}>{this.state.buttonName}</button>
                </Box>
            </Box>
        );
    }
}
export default LeftAudio;