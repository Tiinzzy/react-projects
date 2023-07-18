import React from "react";

import { eventEmitter } from './Matrix';
import Matrix from "./MatrixClass";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function clone_2DA(array) {
    return array.map((row) => [...row]);
}

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 0,
            columns: 0,
            blocked: 0,
            grid: null,
        };
    }

    componentDidMount() {
        eventEmitter.on('gridData', (data) => {
            if (data.message === 'matrix-data') {
                this.setState({ rows: data.rows, columns: data.columns, blocked: data.blocks }, () => {
                    let matrix = new Matrix();
                    let grid = matrix.initializeGrid(this.state.rows * 1, this.state.columns * 1, this.state.blocked * 1);
                    this.setState({ grid });
                });
            };
        });
    }

    getCordinants(r, c) {
        const updatedGrid = clone_2DA(this.state.grid);
        updatedGrid[r][c] = 'X';
        this.setState({ grid: updatedGrid });
    }

    resetMatrix() {
        window.location = '/';
    }

    findMShortestPath() {
        console.log('find');
    }

    componentWillUnmount() {
        eventEmitter.off('gridData');
    }

    render() {
        return (
            <Box style={{ marginTop: 35 }}>
                {this.state.grid && this.state.grid.map((row, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
                        {row.map((col, j) => (
                            <div
                                key={j}
                                style={{ border: 'solid 1px gray', display: 'flex', flexDirection: 'column', padding: 25, cursor: 'pointer' }}
                                onClick={() => this.getCordinants(i, j)}>
                                {col}
                            </div>
                        ))}
                    </div>
                ))}
                {this.state.grid &&
                    <Box style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: 20 }}>
                        <Button variant="contained" onClick={() => this.findMShortestPath()}>Find path</Button>
                        <Button variant="contained" onClick={() => this.resetMatrix()} style={{ marginLeft: 10 }}>Reset</Button>
                    </Box>
                }
            </Box>
        );
    }
};
