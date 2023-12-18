import React from "react";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class LangtonsAnt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 50,
            grid: null,
            counter: 0
        }
    }

    initializeSimulation() {
        let updateBoard = () => {
            this.setState({ counter: this.state.counter + 1 })
            backend.get_langtons_ant((data) => {
                if (this.state.counter % 10 === 0) {
                    console.log(this.state.counter);
                }
                this.setState({ grid: null }, () => {
                    this.setState({ grid: data });
                });
            });
        }

        updateBoard();
        setInterval(updateBoard, this.state.delay);
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
            <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 15 }}>
                <Button variant="outlined" onClick={() => this.initializeSimulation()}>Initialize Langtons Ant Simulation</Button>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box >
                    {this.state.grid && this.renderGrid()}
                </Box>
            </Box>
        );
    }
}
export default LangtonsAnt;