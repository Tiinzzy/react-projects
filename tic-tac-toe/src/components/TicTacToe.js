import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';

import OIcon from '@mui/icons-material/RadioButtonUnchecked';
import XIcon from '@mui/icons-material/Close';

import { RC_ARRAY, USER, COMPUTER, FREE, getNextMove, getRandomMessage } from './tic_tac_to_logic';

import OutcomeDialog from './OutcomeDialog';

import './style.css';

const X_SYMBOL = '✕';
const O_SYMBOL = 'o';
const DELAY_TIME = 1 * 1000;

const X_RETURN_VALUE = <XIcon />;
const O_RETURN_VALUE = <OIcon />;

const USER_MESSAGES = ['It\'s your turn now!', 'Try to win', 'You can do this!'];
const COMPUTER_MESSAGES = ['Now is my turn', 'Let me think for a bit!', 'I will win you!'];

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
            playerTurn: 'Start the game',
            play: false,
            display: true,
            firstTime: true,
            openDialog: false,
            outcomeMessage: ''
        }
    }

    startGame(e) {
        this.setState({ play: true, display: false, userSymbol: e });
    }

    playComputer() {
        setTimeout(() => {
            let move = getNextMove(this.state.board, FREE);
            if (move.cellId !== null) {
                let board = this.state.board;
                board[move.cellId] = COMPUTER;
                this.setState({ turn: USER, board });
            }
            if (move.status === 'computer-wins') {
                this.setState({ openDialog: true, outcomeMessage: 'Computer Wins!' });
            } else if (!this.state.board.includes(0)) {
                this.setState({ openDialog: true, outcomeMessage: 'Draw Result!' });
            }
            this.setState({ firstTime: false, playerTurn: 'Start the Game' }, () => {
                this.setState({ playerTurn: getRandomMessage(USER_MESSAGES) });
            });
        }, DELAY_TIME);
    }

    cellClick(cellId) {
        if (this.state.turn === USER && this.state.board[cellId] === FREE) {
            let board = this.state.board;
            board[cellId] = USER;
            this.setState({ turn: COMPUTER, board });
            this.playComputer();
            this.setState({ playerTurn: getRandomMessage(COMPUTER_MESSAGES) });
        }
    }

    handleCloseDialog() {
        this.setState({ openDialog: false });
    }

    render() {
        return (
            <Box className="MainBox">
                {this.state.display === true &&
                    <Box className="StartGameBox">
                        <Box className="FormItems">
                            <IconButton style={{ marginRight: 55 }} className="EcchItem" onClick={() => this.startGame(X_SYMBOL)}>
                                <input hidden accept="image/*" type="file" />
                                {X_RETURN_VALUE}
                            </IconButton>
                            <IconButton className="EcchItem" onClick={() => this.startGame(O_SYMBOL)}>
                                <input hidden accept="image/*" type="file" />
                                {O_RETURN_VALUE}
                            </IconButton>
                        </Box>
                        <Typography variant="h5" style={{ color: 'rgb(9, 80, 63)' }}>Select a Symbol to Start </Typography>
                    </Box>}
                {this.state.play === true &&
                    <Box className="BoeardGameBox">
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
                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()}>
                    <OutcomeDialog outcomeMessage={this.state.outcomeMessage} />
                </Dialog>
            </Box>
        );
    }
}
export default TicTacToe;    