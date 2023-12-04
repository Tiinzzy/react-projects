import React from "react";

import Box from '@mui/material/Box';
import { TextField, Button, Grid } from '@mui/material';
import Divider from "@mui/material/Divider";

class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 10,
            width: 10,
            grid: [],
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
        this.setState({ grid });
    }

    handleCellClick(row, col) {
        console.log(`Cell clicked: Row ${row}, Col ${col}`);
    }

    renderGrid() {
        return this.state.grid.map((row, rowIndex) => (
            <Grid container key={rowIndex}>
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