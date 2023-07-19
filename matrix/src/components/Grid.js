import React from "react";

import { eventEmitter } from './Matrix';
import Matrix from "./MatrixClass";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function clone_2DA(array) {
    return array.map((row) => [...row]);
}

function findShortestPath(arrayOfObjects) {
    let minObject = null;
    let minValue = Number.POSITIVE_INFINITY;

    for (const obj of arrayOfObjects) {
        if (obj.hasOwnProperty('path') && obj['path'] < minValue) {
            minValue = obj['path'];
            minObject = obj;
        }
    }

    return minObject;
}

let count = 0;

export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 0,
            columns: 0,
            blocked: 0,
            grid: null,
            start: null,
            end: null
        };
    }

    componentDidMount() {
        eventEmitter.on('gridData', (data) => {
            if (data.message === 'matrix-data') {
                this.setState({ rows: data.rows, columns: data.columns, blocked: data.blocks }, () => {
                    let matrix = new Matrix();
                    let grid = matrix.initializeGrid(this.state.rows * 1, this.state.columns * 1, this.state.blocked * 1);
                    this.setState({ grid, matrix, cleanGrid: grid });
                });
            };
        });
    }

    getCordinants(r, c) {
        const updatedGrid = clone_2DA(this.state.grid);
        if (updatedGrid[r][c] === 0) {
            if (count === 0) {
                updatedGrid[r][c] = 1;
                this.setState({ start: [r, c] }, () => {
                    count += 1;
                });
            } else if (count === 1) {
                updatedGrid[r][c] = 9;
                this.setState({ end: [r, c] }, () => {
                    count -= 1;
                });
            }
            this.setState({ grid: updatedGrid });
        }
    }

    resetMatrix() {
        window.location = '/';
    }

    findMShortestPath() {
        let possiblePaths = [];

        for (let i = 0; i < 500; i++) {
            let { path, grid, result } = this.state.matrix.find_a_path(clone_2DA(this.state.cleanGrid), this.state.start, this.state.end);
            if (result) {
                possiblePaths.push({ path: path.length, grid });
            };
        }

        let shortest = findShortestPath(possiblePaths);
        this.setState({ grid: shortest.grid });

    }

    componentWillUnmount() {
        eventEmitter.off('gridData');
    }

    render() {
        return (
            <Box style={{ marginTop: 35 }}>
                {this.state.grid && this.state.grid.map((row, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'row', margin: 1 }}>
                        {row.map((col, j) => (
                            <div
                                key={j}
                                style={{ height: 15, width: 15, border: 'solid 1px gray', display: 'flex', flexDirection: 'column', padding: 25, cursor: col === 8 ? 'auto' : 'pointer', margin: 1 }}
                                onClick={() => { this.getCordinants(i, j) }}>
                                {col}
                            </div>
                        ))}
                    </div>
                ))
                }
                {
                    this.state.grid &&
                    <Box style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: 20 }}>
                        <Button variant="contained" onClick={() => this.findMShortestPath()}>Find path</Button>
                        <Button variant="contained" onClick={() => this.resetMatrix()} style={{ marginLeft: 10 }}>Reset</Button>
                    </Box>
                }
            </Box >
        );
    }
};
