import React from "react";

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

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
            selectedCoord: null,
        }
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
        let friction = this.state.mass * this.state.miu * this.state.g;
        let initVel = this.state.initForce / this.state.mass;
        this.setState({ velocity: initVel });
    }

    handleGridClick = (row, col) => {
        this.setState({
            selectedCoord: this.state.selectedCoord?.row === row && this.state.selectedCoord?.col === col ? null : { row, col }
        });
    }

    renderGrid() {
        const gridStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(50, 20px)',
            gridTemplateRows: 'repeat(50, 20px)',
            border: '2px solid black',
            backgroundColor: 'white',
            width: '1000px',
            height: '1000px',
        };

        return (
            <div style={gridStyle}>
                {this.state.grid.flatMap((row, rowIndex) =>
                    row.map((_, colIndex) => {
                        const isSelected = this.state.selectedCoord?.row === rowIndex && this.state.selectedCoord?.col === colIndex;
                        const cellStyle = {
                            width: '20px',
                            height: '20px',
                            backgroundColor: isSelected ? 'red' : 'white',
                            boxSizing: 'border-box'
                        };

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                style={cellStyle}
                                onClick={() => this.handleGridClick(rowIndex, colIndex)}
                            />
                        );
                    })
                )}
            </div>
        );
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
                        <TextField label="Miu" type="number" value={this.state.miu}
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
                    {this.renderGrid()}
                </div>
            </Box>
        );
    }
} export default Motion;