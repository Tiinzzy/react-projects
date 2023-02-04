import React from "react";

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import OIcon from '@mui/icons-material/RadioButtonUnchecked';
import XIcon from '@mui/icons-material/Close';

import { RC_ARRAY, USER, COMPUTER, FREE, getNextMove } from './tic_tac_to_logic';

import './style.css';

const X_SYMBOL = '✕';
const O_SYMBOL = 'o';
const DELAY_TIME = 1 * 1000;

const X_RETURN_VALUE = <XIcon />;
const O_RETURN_VALUE = <OIcon />;


const cellStyle = (turn) => {
    return {
        cursor: turn === USER ? 'pointer' : 'auto'
    }
}

function xo(id, userSymbol) {
    let result = '';
    if (id === USER) {
        result = userSymbol === X_SYMBOL ? X_RETURN_VALUE : O_RETURN_VALUE
    } else if (id === COMPUTER) {
        result = userSymbol === X_SYMBOL ? O_RETURN_VALUE : X_RETURN_VALUE
    }

    return (<div>{result}</div>)
}

class TicTacToe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: [...Array(9)].map(e => FREE),
            turn: USER,
            userSymbol: null,
            playerTurn: 'It\'s your turn',
            play: false,
            display: true
        }
    }

    startGame(e) {
        this.setState({ play: true, display: false, userSymbol: e })
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
            this.setState({ playerTurn: 'It\'s your turn' })
        }, DELAY_TIME);
    }

    cellClick(cellId) {
        if (this.state.turn === USER && this.state.board[cellId] === FREE) {
            let board = this.state.board;
            board[cellId] = USER;
            this.setState({ turn: COMPUTER, board });
            this.playComputer()
            this.setState({ playerTurn: 'Now is my turn' })
        }
    }

    render() {
        return (
            <Box>
                {this.state.display === true &&
                    <Box className="StartGameBox">
                        <FormControl>
                            <RadioGroup>
                                <span className="FormItems">
                                    <span style={{ marginRight: 10 }}>
                                        <FormControlLabel value={X_SYMBOL} control={<Radio />} label={X_RETURN_VALUE} onClick={() => this.startGame(X_SYMBOL)} />
                                    </span>
                                    <FormControlLabel value={O_SYMBOL} control={<Radio />} label={O_RETURN_VALUE} onClick={() => this.startGame(O_SYMBOL)} />
                                </span>
                            </RadioGroup>
                        </FormControl>
                        <Typography variant="h6" style={{ color: 'rgb(9, 80, 63)' }}>Select a Player to Start </Typography>
                    </Box>}
                {this.state.play === true && <Box>
                    <Box className="PlayerTurn">
                        {this.state.playerTurn}
                    </Box>

                    {RC_ARRAY.map(r => (
                        <Box display='flex' key={r}>
                            {RC_ARRAY.map(c => (
                                <Box className="EachRow" key={c} style={cellStyle(this.state.turn)} onClick={() => this.cellClick(r * 3 + c)}>
                                    {xo(this.state.board[r * 3 + c], this.state.userSymbol)}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>}
            </Box>
        );
    }
}
export default TicTacToe;    