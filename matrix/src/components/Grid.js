import React from "react";

import { eventEmitter } from './Matrix';
import Matrix from "./MatrixClass";

import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import './style.css';

function clone_2DA(array) {
    return array.map((row) => [...row]);
}

function find_shortest_path(arrayOfObjects) {
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

function get_path_arrow(from_cell, to_cell) {
    if (from_cell[0] === to_cell[0] && from_cell[1] === to_cell[1] - 1) {
        return '→'
    } else if (from_cell[0] === to_cell[0] && from_cell[1] === to_cell[1] + 1) {
        return '←'
    } else if (from_cell[0] === to_cell[0] - 1 && from_cell[1] === to_cell[1]) {
        return '↓'
    } else if (from_cell[0] === to_cell[0] + 1 && from_cell[1] === to_cell[1]) {
        return '↑'
    }
    return '?';
}

function to_cell_char(cell_id) {
    if (cell_id === 0) {
        return " ";
    } else if (cell_id === 1) {
        return "○";
    } else if (cell_id === 9) {
        return "●";
    } else if (cell_id === 8) {
        return " ";
    } else {
        return cell_id;
    }
};

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
            end: null,
            displaySnack: false,
            openSnackBar: false,
            nullError: false
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
        if ((count === 0 && updatedGrid.some(row => row.includes(1)) && updatedGrid.some(row => row.includes(9))) ||
            (count === 1 && updatedGrid.some(row => row.includes(1)) && updatedGrid.some(row => row.includes(9)))) {
            return;
        }

        if (updatedGrid[r][c] !== 8) {
            if (count === 0) {
                updatedGrid[r][c] = 1;
                if (updatedGrid[r][c] === 1) {
                    this.setState({ start: [r, c] }, () => {
                        count = 1;
                    });
                }
            } else if (count === 1) {
                updatedGrid[r][c] = 9;
                if (updatedGrid[r][c] === 9) {
                    this.setState({ end: [r, c] }, () => {
                        count = 0;
                    });
                }
            }
            this.setState({ grid: updatedGrid });
        }
    }


    resetMatrix() {
        window.location = '/';
    }

    findShortestPath() {
        let possiblePaths = [];
        if (this.state.start !== null && this.state.end !== null) {
            for (let i = 0; i < 1000; i++) {
                let { path, grid, result } = this.state.matrix.find_a_path(clone_2DA(this.state.cleanGrid), this.state.start, this.state.end);
                if (result) {
                    possiblePaths.push({ path: path.length, grid, direction: path });
                };
            }

            let shortest = find_shortest_path(possiblePaths);
            if (shortest !== null) {
                this.setState({ grid: shortest.grid, path: shortest.direction }, () => {
                    const updatedGrid = clone_2DA(this.state.grid);
                    for (let i = 1; i < this.state.path.length - 1; i++) {
                        updatedGrid[this.state.path[i][0]][this.state.path[i][1]] = get_path_arrow(this.state.path[i], this.state.path[i + 1]);
                    }
                    this.setState({ grid: updatedGrid });
                });
            } else {
                this.setState({ displaySnack: true, openSnackBar: true });
            }
        } else {
            this.setState({ displaySnack: true, openSnackBar: true, nullError: true });
        }
    }

    closeAlert() {
        this.setState({ displaySnack: false, openSnackBar: false });
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
                                className={`cell ${col === 8 ? 'cross' : ''}`}
                                style={{
                                    height: 15, width: 15, border: 'solid 1px gray', display: 'flex', flexDirection: 'column', padding: 25, cursor: col === 8 ? 'auto' : 'pointer', margin: 1,
                                    color: col === 1 ? '#0E9C24' : col === 9 ? '#FF4E4E' : col === 8 ? '#6701CD' : 'orange', fontWeight: 'bold'
                                }}
                                onClick={() => this.getCordinants(i, j)}>
                                {to_cell_char(col)}
                            </div>
                        ))}
                    </div>
                ))}
                {this.state.grid &&
                    <Box style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop: 20 }}>
                        <Button variant="contained" onClick={() => this.findShortestPath()} >Find path</Button>
                        <Button variant="contained" onClick={() => this.resetMatrix()} style={{ marginLeft: 10 }}>Reset</Button>
                    </Box>}
                {this.state.displaySnack === true &&
                    <Snackbar open={this.state.openSnackBar} onClose={() => this.closeAlert()} autoHideDuration={4500} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert severity="error">
                            {this.state.nullError ? "Have to set both start and end points!" : "Couldn't find a path!"}
                        </Alert>
                    </Snackbar>}
            </Box >
        );
    }
};
