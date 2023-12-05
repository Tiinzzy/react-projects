import React from "react";

import Box from '@mui/material/Box';
import { TextField, Button, Grid } from '@mui/material';
import Divider from "@mui/material/Divider";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

function checkBoard(boardObject) {
    let count = 0;

    for (let array of boardObject) {
        if (array.includes(1)) {
            count++;
        }

        if (count > 1) {
            return false;
        }
    }
    return count === 1;
}

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 10,
            width: 10,
            generations: '100',
            grid: [],
            currentGeneration: 0,
            initialization: 5
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
        let grid = [];
        for (let i = 0; i < this.state.height; i++) {
            let row = [];
            for (let j = 0; j < this.state.width; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        this.setState({ grid }, () => {
            let query = { 'column': this.state.height * 1, 'row': this.state.width * 1, 'generations': this.state.generations, 'initCount': this.state.initialization };
            backend.game_of_life_init(query, (data) => {
                if (data.board.length > 0) {
                    this.setState({ grid: data.board }, () => this.fetchGeneration());
                }
            })
        });
    }

    fetchGeneration() {
        let evolveGenerations = setInterval(() => {
            backend.fetch_evolved_generation((data) => {
                console.log(checkBoard(data.board))
                this.setState({ grid: data.board });
                // setTimeout(() => {
                //     this.setState({ grid: data.board });
                //     clearInterval(evolveGenerations);
                // }, 5000);
            })
        }, 5000)
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
        return this.state.grid.map((row, rowIndex) => (
            <Grid container key={rowIndex} spacing={1}>
                {row.map((cell, colIndex) => (
                    <Grid item key={colIndex} xs={1}
                        style={{ width: '20px', height: '20px', border: '1px solid black', backgroundColor: cell ? 'black' : 'white' }}
                        onClick={() => this.handleCellClick(rowIndex, colIndex)}
                    />
                ))}
            </Grid>
        ));
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 5, padding: 20 }}>
                <TextField label="Height" name="height" type="number" value={this.state.height} onChange={(e) => this.handleChange(e)} />
                <TextField label="Width" name="width" type="number" value={this.state.width} onChange={(e) => this.handleChange(e)} sx={{ mt: 3 }} />
                <TextField label="Random Initialization" name="Random Initialization" type="number" value={this.state.initialization} onChange={(e) => this.handleGetRandomIniti(e)} sx={{ mt: 3 }} />
                <TextField label="Generations" name="Generations" type="number" value={this.state.generations} onChange={(e) => this.handleGetGenerations(e)} sx={{ mt: 3 }} />
                <Box style={{ display: 'flex', marginTop: 15 }}>
                    <Box flexGrow={1} />
                    <Button variant="outlined" onClick={() => this.createGrid()}>Create Grid</Button>
                </Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                {this.renderGrid()}
            </Box>
        );
    }
}

export default GameOfLife;