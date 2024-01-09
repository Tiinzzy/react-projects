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
            massError: false,
            initForceError: false,
            disableButton: false
        }
        this.createSvg = this.createSvg.bind(this);
        this.updateSvg = this.updateSvg.bind(this);
        this.handleGridClick = this.handleSvgClick.bind(this);
    }

    componentDidMount() {
        this.createSvg();
    }

    handleGetMass(e) {
        this.setState({ mass: e.target.value * 1, massError: false, initForceError: false });
    }

    handleGetMiu(e) {
        this.setState({ miu: e.target.value * 1 });
    }

    handleGetInitForce(e) {
        this.setState({ initForce: e.target.value * 1, massError: false, initForceError: false }, () => {
            let initVel = this.state.initForce / this.state.mass;
            this.setState({ velocity: initVel });
        });
    }

    createGrid() {
        if (this.state.mass.length <= 0 && this.state.initForce <= 0) {
            this.setState({ massError: true, initForceError: true });
        } else if (this.state.mass.length <= 0) {
            this.setState({ massError: true });
        } else if (this.state.initForce <= 0) {
            this.setState({ initForceError: true });
        } else {
            console.log('test');
        }
        // startMotion(this.state.mass, this.state.miu, this.state.velocity, this.state.initForce, this.state.selectedRedCoord, this.state.selectedBlackCoord);
    }

    handleSvgClick(row, col) {
        this.setState(prevState => {
            let selectedRedCoord = prevState.selectedRedCoord;
            let selectedBlackCoord = prevState.selectedBlackCoord;

            if (selectedRedCoord && selectedRedCoord.row === row && selectedRedCoord.col === col) {
                selectedRedCoord = null;
            } else if (selectedBlackCoord && selectedBlackCoord.row === row && selectedBlackCoord.col === col) {
                selectedBlackCoord = null;
            } else if (!selectedRedCoord) {
                selectedRedCoord = { row, col };
            } else if (!selectedBlackCoord) {
                selectedBlackCoord = { row, col };
            } else {
                selectedRedCoord = { row, col };
            }

            this.updateSvg(selectedRedCoord, selectedBlackCoord);
            return { selectedRedCoord, selectedBlackCoord };
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

            this.handleSvgClick(row, col);
        });
    }

    updateSvg(redCoord, blackCoord) {
        const svg = d3.select("#container");
        svg.selectAll("circle").remove();

        if (redCoord) {
            svg.append("circle")
                .attr("cx", redCoord.col * 20 + 10)
                .attr("cy", redCoord.row * 20 + 10)
                .attr("r", 9)
                .attr("fill", "red");
        }

        if (blackCoord) {
            svg.append("circle")
                .attr("cx", blackCoord.col * 20 + 10)
                .attr("cy", blackCoord.row * 20 + 10)
                .attr("r", 9)
                .attr("fill", "black");
        }
    }

    render() {
        return (
            <Box style={{ marginTop: 30, marginLeft: 25, }}>
                <Box style={{ alignItems: 'center', display: 'flex' }}>
                    <Box display='flex'>
                        <TextField label="Mass" type="number" value={this.state.mass}
                            onChange={(e) => this.handleGetMass(e)} sx={{ width: 120 }} error={this.state.massError} />
                        <TextField label="Initial Force" type="number" value={this.state.initForce}
                            onChange={(e) => this.handleGetInitForce(e)} sx={{ ml: 2, width: 120 }} error={this.state.initForceError} />
                        <TextField label="μ" type="number" value={this.state.miu}
                            onChange={(e) => this.handleGetMiu(e)} sx={{ ml: 2, width: 120 }} />
                        <TextField label="g" type="number" value={this.state.g} sx={{ ml: 2, width: 120 }} disabled />
                        <TextField label="Time" type="number" value={this.state.time} sx={{ ml: 2, width: 120 }} disabled />
                        <TextField label="Velocity" type="number" value={this.state.velocity} sx={{ ml: 2, width: 120 }} disabled />
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="outlined" onClick={() => this.createGrid()} sx={{ ml: 3 }} size="large">Start Motion</Button>
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