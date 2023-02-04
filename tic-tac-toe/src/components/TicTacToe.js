import React from "react";

import Box from '@mui/material/Box'

import { RC_ARRAY, USER, COMPUTER, FREE, getNextMove } from './tic_tac_to_logic'


const X_SYMBOL = '✕';
const O_SYMBOL = 'o';
const DELAY_TIME = 2 * 1000;


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


function xo(id, userSymbol) {
    if (id === USER) {
        return userSymbol
    } else if (id === COMPUTER) {
        return userSymbol === X_SYMBOL ? O_SYMBOL : X_SYMBOL
    } else {
        return ''
    }
}

class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: [...Array(9)].map(e => FREE),
            turn: USER,
            userSymbol: X_SYMBOL
        }
    }

    playComputer() {
        setTimeout(() => {
            let move = getNextMove(this.state.board, FREE);
            if (move.cellId !== null) {
                let board = this.state.board;
                board[move.cellId] = COMPUTER;
                this.setState({ turn: USER, board });
            }
            console.log(move.status);
        }, DELAY_TIME);
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
                                {xo(this.state.board[r * 3 + c], this.state.userSymbol)}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        );
    }
}
export default TicTacToe;    