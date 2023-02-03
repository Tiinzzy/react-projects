import React from "react";

import Box from '@mui/material/Box'

import './style.css';

import { GAME_BODY, insertIntoCurrentHouses, CURRENT_FULL_HOUSES, ALL_HOUSES, findNextMove, WINNING_POSSIBILITIES } from './constants';
import { Button } from "@mui/material";

const DELAY_TIME = 3 * 1000;

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'User\'s turn',
            firstTime: true,
            play: false,
            display: true

        }
        this.houseClicked = this.houseClicked.bind(this);
        this.startGame = this.startGame.bind(this);
    }
    startGame() {
        this.setState({ play: true, display: false })
    }
    houseClicked(e) {
        insertIntoCurrentHouses(e, 'X')
        document.getElementById(e);
        document.getElementById(e).textContent = "X";
        this.computerMove();
        this.setState({ message: 'Computer\'s turn' });

    }

    computerMove() {
        if (this.state.firstTime === true) {
            setTimeout(() => {
                this.setState({ message: 'User turn', firstTime: false }, () => {
                    let placementIndex = Math.floor(Math.random() * CURRENT_FULL_HOUSES.length);
                    let initialPlacement = ALL_HOUSES[placementIndex];
                    document.getElementById(initialPlacement).textContent = "O";
                    insertIntoCurrentHouses(initialPlacement, 'O');
                });
            }, DELAY_TIME);
        } else {
            setTimeout(() => {
                this.setState({ message: 'User turn', firstTime: false }, () => {
                    let nextMoveIndex = findNextMove(WINNING_POSSIBILITIES, CURRENT_FULL_HOUSES);
                    let nextMove = ALL_HOUSES[nextMoveIndex];
                    console.log('error -->', nextMove)
                    if (nextMove !== undefined) {
                        insertIntoCurrentHouses(nextMove, 'O');
                        document.getElementById(nextMove).textContent = "O";
                    }
                });
            }, DELAY_TIME);
        }
    }

    render() {
        return (
            <Box id="main-div" className="GameBody">
                {this.state.display === true &&
                    <Button variant="contained" className="StartBtn" onClick={() => this.startGame()}>Start</Button>}
                {this.state.play === true &&
                    <Box className="PlayerTurn">
                        {this.state.message}</Box>}
                {this.state.play === true &&
                    <Box className="EachMapping">
                        {GAME_BODY[0].map((rows, index) =>
                            < Box id={rows} key={index}
                                onClick={() => this.houseClicked(rows)}
                                className="EachRow">
                            </Box>)}
                    </Box>}
                {this.state.play === true &&
                    <Box className="EachMapping">
                        {GAME_BODY[1].map((rows, index) =>
                            < Box id={rows} key={index}
                                onClick={() => this.houseClicked(rows)}
                                className="EachRow">
                            </Box>)}
                    </Box>}
                {this.state.play === true &&
                    <Box className="EachMapping">
                        {GAME_BODY[2].map((rows, index) =>
                            < Box id={rows} key={index}
                                onClick={() => this.houseClicked(rows)}
                                className="EachRow">
                            </Box>)}
                    </Box>}
                <Box id="final-result" className="PlayerTurn" marginTop={2}></Box>
            </Box>
        );
    }
}
export default Game;