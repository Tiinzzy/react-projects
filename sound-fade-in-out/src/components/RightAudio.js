import React from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

class RightAudio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSound: null,
            fileName: '',
            selectFile: 'No File Chosen',
        }
    }

    getAudio(e) {
        if (e) {
            let audio = URL.createObjectURL(e.target.files[0]);
            this.setState({ audioSound: audio, fileName: e.target.files[0].name, selectFile: '' });
        }
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
                    <audio id="sound" controls src={this.state.audioSound}></audio>
                </Box>
            </Box>
        );
    }
}
export default RightAudio;