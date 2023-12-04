import React from "react";

import Box from '@mui/material/Box';
import { TextField, Button, Grid } from '@mui/material';
import Divider from "@mui/material/Divider";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 10,
            width: 10,
            generations: '100',
            grid: [],
            currentGeneration: 0
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
    }

    handleGetGenerations(e) {
        this.setState({ generations: e.target.value * 1 });
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
            let query = { 'height': this.state.height * 1, 'width': this.state.width * 1, 'generations': this.state.generations };
            backend.game_of_life(query, (data) => {
                console.log(data);
                this.fetchGeneration(0);
            })
        });
    }

    fetchGeneration(gen) {
        backend.fetch_generation(gen, (data) => {
            console.log(data);
            if (data && data.result !== false) {
                this.setState({ grid: data, currentGeneration: gen });
                if (gen < this.state.generations - 1) {
                    setTimeout(() => this.fetchGeneration(gen + 1), 300);
                }
            } else {
                console.error('Error fetching generation:', gen);
            }
        });
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