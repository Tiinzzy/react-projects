import React from "react";

import Box from '@mui/material/Box';
import { TextField, Button, Grid } from '@mui/material';
import Divider from "@mui/material/Divider";

import BackEndConnection from '../BackEndConnection';
import { ThirtyFpsOutlined } from "@mui/icons-material";

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
            initialization: 100,
            grid: [],
            currentGeneration: 0,
            delay: 900,
            evolveGenerations: null
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
    }

    handleGetGenerations(e) {
        this.setState({ generations: e.target.value * 1 });
    }

    handleGetRandomIniti(e) {
        this.setState({ initialization: e.target.value * 1 });
    }

    createGrid() {
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
        console.log(`Cell clicked: Row ${row}, Col ${col}`);
        let newGrid = this.state.grid.map((currentRow, rowIndex) => {
            if (rowIndex === row) {
                return currentRow.map((cell, colIndex) => {
                    if (colIndex === col) {
                        return cell ? 0 : 1;
                    }
                    return cell;
                });
            }
            return currentRow;
        });
        this.setState({ grid: newGrid });
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
                    <div key={colIndex} style={cellStyle(cell)} >{rowIndex},{colIndex}</div>
                ))}
            </div>
        ));
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 5, padding: 20 }}>

                <Box display='flex'>
                    <TextField label="Row" type="number" name='height' value={this.state.height}
                        onChange={(e) => this.handleChange(e)} sx={{ width: 120 }} />

                    <TextField label="Column" type="number" name='width' value={this.state.width}
                        onChange={(e) => this.handleChange(e)} sx={{ ml: 2, width: 120 }} />

                    <TextField label="Random Initialization" type="number" value={this.state.initialization}
                        onChange={(e) => this.handleGetRandomIniti(e)} sx={{ ml: 2, width: 200 }} />

                    <Button variant="outlined" onClick={() => this.createGrid()} sx={{ ml: 3 }} >Start</Button>
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