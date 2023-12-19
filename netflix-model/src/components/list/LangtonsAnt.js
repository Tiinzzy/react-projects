import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class LangtonsAnt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 500,
            grid: null,
            counter: 0,
            boardSize: 50,
            steps: 10,
            updateGrid: null
        }
    }

    getBoardSize(e) {
        this.setState({ boardSize: e.target.value * 1 });
    }

    getStepsNumber(e) {
        this.setState({ steps: e.target.value * 1 });
    }

    initializeSimulation() {
        if (this.state.updateGrid !== null) {
            clearInterval(this.state.updateGrid);
        }

        let updateBoard = () => {
            this.setState({ counter: this.state.counter + 1 })
            backend.get_langtons_ant(this.state.boardSize, this.state.steps, (data) => {
                if (this.state.counter % 10 === 0) {
                    console.log(this.state.counter);
                }
                this.setState({ grid: null }, () => {
                    this.setState({ grid: data.data, stepNum: data.steps });
                });
            });
        }

        updateBoard();
        let updateGrid = setInterval(updateBoard, this.state.delay);
        this.setState({ updateGrid });
    }

    stopGrid() {
        console.log('stopGrid()');
        clearInterval(this.state.updateGrid);
    }

    resetGrid() {
        backend.reset_langtons((data) => {
            if (data.grid === "reset") {
                this.setState({ grid: null });
            };
        })
    }

    renderGrid() {
        let cellSize = 12;

        let rowStyle = {
            padding: 0,
            margin: 0,
            height: cellSize,
            marginBottom: 4,
        }

        let cellStyle = (cell) => {
            return {
                border: 'solid 1px gray',
                marginRight: 2,
                height: cellSize,
                width: cellSize * 1.1,
                display: 'inline-block',
                backgroundColor: cell ? 'black' : 'white',
                color: cell ? 'white' : 'black',
                fontSize: 8
            }
        }
        return this.state.grid.map((row, rowIndex) => (
            <div key={rowIndex} style={rowStyle}>
                {row.map((cell, colIndex) => (
                    <div key={colIndex} style={cellStyle(cell)}>
                    </div>
                ))}
            </div>
        ));
    }

    render() {
        return (
            <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 20 }}>
                <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 20 }}>
                    <TextField label="Board Size" type="number" value={this.state.boardSize}
                        onChange={(e) => this.getBoardSize(e)} sx={{ width: 150, mr: 2 }} />
                    <TextField label="Number of Steps" type="number" name='width' value={this.state.steps}
                        onChange={(e) => this.getStepsNumber(e)} sx={{ width: 150 }} />
                </Box>
                <Button variant="outlined" onClick={() => this.initializeSimulation()}>Start Langtons Ant Simulation</Button>
                <Box style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.state.grid && <Button variant="outlined" onClick={() => this.stopGrid()} sx={{ mt: 1, mr: 2 }}>Stop</Button>}
                    {this.state.grid && <Button variant="outlined" onClick={() => this.resetGrid()} sx={{ mt: 1 }}>Reset</Button>}
                </Box>
                <Divider sx={{ mt: 2, mb: 1 }} />
                {this.state.grid && this.state.stepNum && <Typography fontSize={20}>Step Number: {this.state.stepNum}</Typography>}
                <Box >
                    {this.state.grid && this.renderGrid()}
                </Box>
            </Box >
        );
    }
}
export default LangtonsAnt;