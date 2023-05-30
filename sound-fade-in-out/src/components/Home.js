import React from "react";

import LeftAudio from "./LeftAudio";
import RightAudio from "./RightAudio";
import Button from "@mui/material/Button";

import EventEmitter from 'eventemitter3';

export const eventEmitter = new EventEmitter();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    playBothAudio() {
        const data = {
            message: 'play audio', callBack: function (data) {
                if (data) {
                    console.log(data);
                }
            }
        };
        eventEmitter.emit('customEvent', data);
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
                <Button variant="contained" onClick={() => this.playBothAudio()}>PLay</Button>
            </>
        );
    }
}
export default Home;