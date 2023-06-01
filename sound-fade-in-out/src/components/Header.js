import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import IconButton from '@mui/material/IconButton';

import EventEmitter from 'eventemitter3';

export const styleEventEmitter = new EventEmitter();

const INSTRUCTIONS = ['1.Select two different audio files on either side of the audi player.',
    '2.You can play each audio seprately one at a time, or play both together.',
    '3.You can control the audios volume, once you select an audio file.',
    '4.You can play both audios with fade in-n-out button, which starts both audios at the same time, with first audio having maximum\
     volume and decrease as the second audio increases from the minimum volume to the max.',
    '5.You can also fade in-n-out in the middle of the audios if you wish to play them on your own at any time, just click on the in-n-out button.'];

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setTheme: 'light'
        }
    }

    toggleTheme() {
        if (this.state.setTheme === 'light') {
            this.setState({ setTheme: 'dark' });
            styleEventEmitter.emit('settingStyle', { className: 'dark' });
        } else {
            this.setState({ setTheme: 'light' });
            styleEventEmitter.emit('settingStyle', { className: 'light' });
        }
    }

    render() {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="white" fontWeight='bold'>
                                Sound Mix
                            </Typography>
                            <IconButton onClick={() => this.toggleTheme()}>
                                {this.state.setTheme === 'light' ? <WbSunnyIcon color="sun" /> : <Brightness3Icon color="moon" />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box className={this.state.setTheme} >
                    <Typography variant="h5" pt={2} pb={2} ml={3} fontWeight="500">Instructions:</Typography>
                    {INSTRUCTIONS.map((e, i) => (
                        <Typography variant="body1" ml={3} key={i}>{e}</Typography>
                    ))}
                </Box>
            </>
        );
    }
};