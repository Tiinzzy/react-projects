import React from "react";

import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

import * as d3 from "d3";

import { getRedBallDirection, getForce, getNewVelocity, getVelocityVector } from './physics';

const MAX_X = 1000;
const MAX_Y = 1000;
const UPDATE_INTERVAL = 50;

class Motion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mass: 0.5,
            miu: 0.1,
            velocity: 0,
            initForce: 0,
            time: 1,
            g: 9.81,
            selectedRedCoord: null,
            selectedBlackCoord: null,
            massError: false,
            disableButton: false,
            ballMessage: '',
            systemStarted: false,
            interval: null,
            timer: { minutes: 0, seconds: 0, milliseconds: 0 },
            timerInterval: null,
            systemStarted: false
        }
        this.createSvg = this.createSvg.bind(this);
        this.updateSvg = this.updateSvg.bind(this);
        this.handleSvgClick = this.handleSvgClick.bind(this);
        this.selectColoredBalls = this.selectColoredBalls.bind(this);
        this.state.resetMotion = this.resetMotion.bind(this);
    }

    componentDidMount() {
        this.createSvg();
    }

    componentDidUpdate(prevState) {
        if (!prevState.selectedBlackCoord && this.state.selectedBlackCoord) {
            this.selectColoredBalls();
        }
    }

    componentWillUnmount() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
        }
        if (this.state.interval) {
            clearInterval(this.state.timerInterval);
        }
    }

    resetMotion() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
        }
        if (this.state.interval) {
            clearInterval(this.state.timerInterval);
        }
        this.setState({
            velocity: 0, initForce: 0, time: 1, g: 9.81, selectedRedCoord: null, selectedBlackCoord: null, massError: false,
            disableButton: false, ballMessage: '', systemStarted: false, interval: null, timer: { minutes: 0, seconds: 0, milliseconds: 0 },
            timerInterval: null, systemStarted: false
        })

        let svg = d3.select("#container");
        svg.selectAll("circle").remove();
    }

    handleGetMass(e) {
        this.setState({ mass: e.target.value * 1, massError: false });
    }

    handleGetMiu(e) {
        this.setState({ miu: e.target.value * 1 });
    }

    selectColoredBalls() {
        if (!this.state.selectedBlackCoord || !this.state.selectedRedCoord) {
            this.setState({ ballMessage: 'Please select red and black balls before you start!' });
        } else {
            const redCoord = { ...this.state.selectedRedCoord };
            if (this.state.interval !== null) {
                clearInterval(this.state.interval);
            }
            if (this.state.timerInterval) {
                clearInterval(this.state.timerInterval);
            }
            this.setState({ timer: { minutes: 0, seconds: 0, milliseconds: 0 } });
            let timerInterval = setInterval(() => {
                this.setState(prevState => {
                    let { minutes, seconds, milliseconds } = prevState.timer;
                    milliseconds += 10;
                    if (milliseconds >= 1000) {
                        milliseconds = 0;
                        seconds += 1;
                    }
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes += 1;
                    }
                    return { timer: { minutes, seconds, milliseconds } };
                });
            }, 10);

            let { dx, dy } = getRedBallDirection(this.state.selectedRedCoord,
                this.state.selectedBlackCoord,
                this.state.miu,
                this.state.mass,
                this.state.initForce);

            let currentVelocity = this.state.initForce / this.state.mass;
            let miu = this.state.miu;
            let interval = setInterval(() => {

                if (currentVelocity > 0) {
                    redCoord.x += dx;
                    redCoord.y += dy;
                    if (redCoord.x <= 0 || redCoord.x >= MAX_X) {
                        dx = -dx;
                        redCoord.x = Math.max(0, Math.min(redCoord.x, MAX_X));
                    }
                    if (redCoord.y <= 0 || redCoord.y >= MAX_Y) {
                        dy = -dy;
                        redCoord.y = Math.max(0, Math.min(redCoord.y, MAX_Y));
                    }
                    this.updateSvg(redCoord, null);
                    this.setState({ selectedRedCoord: redCoord, systemStarted: true });
                    d3.select('#container').selectAll("line").remove();

                    currentVelocity = getNewVelocity(currentVelocity, miu);
                    let currentDXY = getVelocityVector(currentVelocity, dx, dy);
                    dx = currentDXY.dx;
                    dy = currentDXY.dy;
                    if (currentVelocity > 0) {
                        this.setState({ velocity: currentVelocity });
                    } else if (currentVelocity <= 0) {
                        clearInterval(interval);
                        if (this.state.timerInterval) {
                            clearInterval(this.state.timerInterval);
                            this.setState({ timerInterval: null })
                        }
                    }
                }
            }, UPDATE_INTERVAL);

            this.setState({ selectedBlackCoord: null, interval, timerInterval, systemStarted: true });
        }
    }

    handleSvgClick(x, y, ctrlKey) {
        if (this.state.systemStarted) {
            return;
        }
        this.setState(prevState => {
            let selectedRedCoord = prevState.selectedRedCoord;
            let selectedBlackCoord = prevState.selectedBlackCoord;
            let newBallMessage = prevState.ballMessage;
            if ((selectedRedCoord && ctrlKey) || !selectedRedCoord) {
                selectedRedCoord = { x, y };
                selectedBlackCoord = null;
            } else if (!selectedBlackCoord) {
                selectedBlackCoord = { x, y };
            }
            if (selectedRedCoord && selectedBlackCoord) {
                newBallMessage = '';
            } else {
                newBallMessage = 'Please select red and black balls before you start!';
            }
            this.updateSvg(selectedRedCoord, selectedBlackCoord);
            return { selectedRedCoord, selectedBlackCoord, ballMessage: newBallMessage };
        });
    }

    createSvg() {
        const svg = d3.select("#container");
        var points = [
            { xpoint: 0, ypoint: MAX_Y },
            { xpoint: MAX_X, ypoint: MAX_Y }
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
        svg.on("click", (e) => {
            if (!this.state.systemStarted) {
                this.handleSvgClick(e.offsetX, e.offsetY, e.ctrlKey);
            }
        }).on('mousemove', (e) => {
            if (!this.state.systemStarted && this.state.selectedRedCoord !== null && this.state.selectedBlackCoord === null) {
                if (this.state.mousePointer) {
                    if (Math.abs(this.state.mousePointer.x - e.offsetX) + Math.abs(this.state.mousePointer.y - e.offsetY) < 10) {
                        svg.select("line").remove();
                        svg.append('line')
                            .attr('stroke', 'gray')
                            .attr('stroke-dasharray', '5 5')
                            .attr('x1', this.state.selectedRedCoord.x)
                            .attr('y1', this.state.selectedRedCoord.y)
                            .attr('x2', e.offsetX)
                            .attr('y2', e.offsetY);
                        this.setState({ initForce: getForce(this.state.selectedRedCoord, { x: e.offsetX, y: e.offsetY }), velocity: this.state.initForce / this.state.mass });
                    }
                }
            }
            this.setState({ mousePointer: { x: e.offsetX, y: e.offsetY } });
        });
    }

    updateSvg(redCoord, blackCoord) {
        const svg = d3.select("#container");
        svg.selectAll(".test").remove();

        if (redCoord) {
            svg.append("circle")
                .attr("class", 'test')
                .attr("cx", redCoord.x)
                .attr("cy", redCoord.y)
                .attr("r", 3 + Math.sqrt(this.state.mass))
                .attr("fill", "red");
            svg.append("circle")
                .attr("cx", redCoord.x)
                .attr("cy", redCoord.y)
                .attr("r", 2)
                .attr("fill", "#FF5BCB");
        }

        if (blackCoord) {
            svg.append("circle")
                .attr("class", 'test')
                .attr("cx", blackCoord.x)
                .attr("cy", blackCoord.y)
                .attr("r", 3)
                .attr("fill", "black");
        }
    }

    render() {
        return (
            <Box style={{ marginTop: 30, marginLeft: 25, }}>
                <Box style={{ alignItems: 'center', display: 'flex' }}>
                    <Box display='flex'>
                        <TextField label="Mass" type="number" value={this.state.mass}
                            onChange={(e) => this.handleGetMass(e)} sx={{ width: 125 }} error={this.state.massError} />
                        <TextField label="μ" type="number" value={this.state.miu}
                            onChange={(e) => this.handleGetMiu(e)} sx={{ ml: 2, width: 125 }} />
                        <TextField label="Momentom Force" type="number" value={this.state.initForce} sx={{ ml: 2, width: 125 }} disabled />
                        <TextField label="g" type="number" value={this.state.g} sx={{ ml: 2, width: 125 }} disabled />
                        <TextField label="Momentom Time" type="number" value={this.state.time} sx={{ ml: 2, width: 125 }} disabled />
                        <TextField label="Velocity" type="number" value={this.state.velocity} sx={{ ml: 2, width: 125 }} disabled />
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="outlined" onClick={() => this.resetMotion()} sx={{ ml: 3 }} size="large">Reset</Button>
                            {/* <Typography style={{ color: 'crimson', fontSize: '14px', marginLeft: 20 }}>{this.state.ballMessage}</Typography> */}
                            <Typography style={{ marginLeft: 60, fontSize: 20, userSelect: 'none' }}>
                                {`${String(this.state.timer.minutes).padStart(2, '0')}:${String(this.state.timer.seconds).padStart(2, '0')}.${String(this.state.timer.milliseconds).padStart(3, '0')}`}
                            </Typography>
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