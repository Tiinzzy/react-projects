import React from "react";

import { draw, getMotionDataset } from './motion-helper';

import './motion.css';

const WIDTH = 1200;
const HEIGHT = 900;


const CONTAINER_STYLE = {
    height: HEIGHT,
    width: WIDTH
}

class Motion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        let datasets = [
            { name: 'dsv10', data: getMotionDataset(0, 100, 10, 0) },
            { name: 'dsv10', data: getMotionDataset(30, 100, 2, 2) },
            // { name: 'dsv10', data: getMotionDataset(0, 100, 10, 0) }
        ];

        draw(WIDTH, HEIGHT, datasets);
    }

    render() {
        return (
            <svg id='container' style={CONTAINER_STYLE}>
            </svg>
        );
    }
}
export default Motion;