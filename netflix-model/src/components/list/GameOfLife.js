import React from "react";

import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import Divider from "@mui/material/Divider";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

function boardIsEmpty(boardObject) {
    let count = 0;
    for (let array of boardObject) {
        if (array.includes(1)) {
            count++;
        }
    }
    return count < 1;
}

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 30,
            width: 40,
            initialization: 10,
            grid: [],
            currentGeneration: 0,
            delay: 900,
            evolveGenerations: null,
            largeValueError: false,
            initialClick: true,
            msg: 'initial'
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: parseInt(e.target.value, 10), largeValueError: false });
    }


    handleGetRandomIniti(e) {
        this.setState({ initialization: e.target.value * 1, largeValueError: false });
    }

    createGrid() {
        this.setState({ initialClick: !this.state.initialClick });
        if (this.state.initialization >= this.state.height * this.state.width) {
            this.setState({ largeValueError: true });
        } else {
            if (this.state.initialClick === false) {
                clearInterval(this.state.evolveGenerations);
            } else {
                if (this.state.msg === 'update') {
                    let query = {
                        grid: this.state.grid,
                        row: this.state.height * 1,
                        column: this.state.width * 1,
                    };
                    backend.update_grid(query, (data) => {
                        console.log(data);
                        if (data) {
                            this.setState({ grid: data.board }, () => this.fetchGeneration());
                        }
                    })
                } else {
                    let query = {
                        row: this.state.height * 1,
                        column: this.state.width * 1,
                        generations: this.state.generations,
                        initCount: this.state.initialization
                    };
                    backend.game_of_life_init(query, (data) => {
                        if (data.board.length > 0) {
                            this.setState({ grid: data.board }, () => this.fetchGeneration());
                        }
                    })
                }
            }
        }
    }

    fetchGeneration() {
        if (this.state.evolveGenerations !== null) {
            clearInterval(this.state.evolveGenerations);
        }
        let evolveGenerations = setInterval(() => {
            backend.fetch_evolved_generation((data) => {
                this.setState({ grid: data.board }, () => {
                    if (boardIsEmpty(data.board)) {
                        clearInterval(evolveGenerations);
                    }
                });
            })
        }, this.state.delay);
        this.setState({ evolveGenerations });
    }

    handleCellClick(row, col) {
        let newGrid = this.state.grid;
        newGrid[row][col] = (newGrid[row][col] + 1) % 2;  // newGrid[row][col] === 1 ? 0 : 1;
        this.setState({ grid: newGrid, msg: 'update' });
    }

    renderGrid() {
        let cellSize = 25;

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
                    <div key={colIndex} style={cellStyle(cell)} onClick={() => this.handleCellClick(rowIndex, colIndex)}>{rowIndex},{colIndex}</div>
                ))}
            </div>
        ));
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 5, padding: 20 }}>

                <Box display='flex' style={{ height: 80 }}>
                    <TextField label="Row" type="number" name='height' value={this.state.height}
                        onChange={(e) => this.handleChange(e)} sx={{ width: 120 }} />

                    <TextField label="Column" type="number" name='width' value={this.state.width}
                        onChange={(e) => this.handleChange(e)} sx={{ ml: 2, width: 120 }} />

                    <TextField label="Random Initialization" type="number" value={this.state.initialization}
                        onChange={(e) => this.handleGetRandomIniti(e)} sx={{ ml: 2, width: 200 }} error={this.state.largeValueError}
                        helperText={this.state.largeValueError && "Large Value"} />
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button variant="outlined" onClick={() => this.createGrid()} sx={{ ml: 3, mb: 2 }} size="large">{this.state.initialClick === false ? 'Stop' : 'Start'}</Button>
                    </Box>
                </Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box style={{ border: 'solid 0px red' }}>
                    {this.renderGrid()}
                </Box>
            </Box>
        );
    }
}

export default GameOfLife;