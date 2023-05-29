import React from "react";

import LeftAudio from "./LeftAudio";
import RightAudio from "./RightAudio";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', height: '100%' }}>
                <div style={{ width: '50%', border: 'solid 1px red' }}>
                    <LeftAudio />
                </div>
                <div style={{ width: '50%', border: 'solid 1px blue' }}>
                    <RightAudio />
                </div>
            </div>
        );
    }
}
export default Home;