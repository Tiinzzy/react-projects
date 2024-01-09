import React from "react";

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

import * as d3 from "d3";

import { startMotion } from './Physics';

class Motion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mass: '',
            miu: '',
            velocity: '',
            initForce: '',
            time: 1,
            g: 9.81,
            grid: Array(50).fill(Array(50).fill(null)),
            selectedRedCoord: null,
            selectedBlackCoord: null,
        }
        this.createSvg = this.createSvg.bind(this);
    }

    componentDidMount() {
        this.createSvg();
    }

    handleGetMass(e) {
        this.setState({ mass: e.target.value * 1 });
    }

    handleGetMiu(e) {
        this.setState({ miu: e.target.value * 1 });
    }

    handleGetInitForce(e) {
        this.setState({ initForce: e.target.value * 1 });
    }

    createGrid() {
        let initVel = this.state.initForce / this.state.mass;
        this.setState({ velocity: initVel });

        // startMotion(this.state.mass, this.state.miu, this.state.velocity, this.state.initForce, this.state.selectedRedCoord, this.state.selectedBlackCoord);
    }

    handleGridClick(row, col) {
        this.setState(prevState => {
            if (prevState.selectedRedCoord?.row === row && prevState.selectedRedCoord?.col === col) {
                return { selectedRedCoord: null };
            }
            else if (prevState.selectedBlackCoord?.row === row && prevState.selectedBlackCoord?.col === col) {
                return { selectedBlackCoord: null };
            }
            else if (!prevState.selectedRedCoord) {
                return { selectedRedCoord: { row, col } };
            }
            else if (!prevState.selectedBlackCoord) {
                return { selectedBlackCoord: { row, col } };
            }
            else {
                return { selectedRedCoord: { row, col }, selectedBlackCoord: prevState.selectedBlackCoord };
            }
        });
    }

    createSvg() {
        const svg = d3.select("#container");

        var points = [
            { xpoint: 0, ypoint: 1000 },
            { xpoint: 1000, ypoint: 1000 }
        ];

        var Gen = d3.area()
            .x((p) => p.xpoint)
            .y0((p) => 0)
            .y1((p) => p.ypoint);

        d3.select("#container")
            .append("path")
            .attr("d", Gen(points))
            .attr("fill", "white")
            .attr("stroke", "black");

        svg.on("click", (event) => {
            const [x, y] = d3.pointer(event);
            const row = Math.floor(y / 20);
            const col = Math.floor(x / 20);

            this.handleGridClick(row, col);
        });
    }

    render() {
        return (
            <Box style={{ marginTop: 30, marginLeft: 25, }}>
                <Box style={{ alignItems: 'center', display: 'flex' }}>
                    <Box display='flex'>
                        <TextField label="Mass" type="number" value={this.state.mass}
                            onChange={(e) => this.handleGetMass(e)} sx={{ width: 120 }} />
                        <TextField label="Initial Force" type="number" value={this.state.initForce}
                            onChange={(e) => this.handleGetInitForce(e)} sx={{ ml: 2, width: 120 }} />
                        <TextField label="μ" type="number" value={this.state.miu}
                            onChange={(e) => this.handleGetMiu(e)} sx={{ ml: 2, width: 120 }} />
                        <TextField label="g" type="number" value={this.state.g} sx={{ ml: 2, width: 120 }} disabled />
                        <TextField label="Time" type="number" value={this.state.time} sx={{ ml: 2, width: 120 }} disabled />
                        <TextField label="Velocity" type="number" value={this.state.velocity} sx={{ ml: 2, width: 120 }} disabled />
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="outlined" onClick={() => this.createGrid()} sx={{ ml: 3 }} size="large">{this.state.initialClick === false ? 'Stop' : 'Start'}</Button>
                        </Box>
                    </Box>
                </Box>
                <div style={{ marginTop: '20px' }}>
                    <svg id="container" width="1000" height="1000"></svg>
                </div>
            </Box>
        );
    }
} export default Motion;