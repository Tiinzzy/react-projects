import React from "react";

import Box from '@mui/material/Box'

import { getNextMove } from './tic_tac_to_logic'

const RC_ARRAY = [0, 1, 2];
const USER = 1;
const COMPUTER = 10;
const FREE = 0;

const cellStyle = (turn) => {
    return {
        width: 50,
        height: 50,
        border: 'solid 1px crimson',
        margin: 5,
        display: 'flex',
        cursor: turn === USER ? 'pointer' : 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

function xo(id) {
    if (id === USER) {
        return 'X'
    } else if (id === COMPUTER) {
        return 'O'
    } else {
        return ''
    }
}

class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: [...Array(9)].map(e => FREE),
            turn: USER
        }
    }

    playComputer() {
        let move = getNextMove(this.state.board, FREE);
        if (move.cellId !== null) {
            let board = this.state.board;
            board[move.cellId] = COMPUTER;
            this.setState({ turn: USER, board });
        }
        console.log(move.status);
    }

    cellClick(cellId) {
        if (this.state.turn === USER && this.state.board[cellId] === FREE) {
            let board = this.state.board;
            board[cellId] = USER;
            this.setState({ turn: COMPUTER, board });
            this.playComputer()
        }
    }

    render() {
        return (
            <Box>
                {RC_ARRAY.map(r => (
                    <Box display='flex' key={r}>
                        {RC_ARRAY.map(c => (
                            <Box key={c} style={cellStyle(this.state.turn)} onClick={() => this.cellClick(r * 3 + c)}>
                                {xo(this.state.board[r * 3 + c])}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        );
    }
}
export default TicTacToe;    