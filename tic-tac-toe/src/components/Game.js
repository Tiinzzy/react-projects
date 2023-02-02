import React from "react";

import Box from '@mui/material/Box'

import './style.css';

import { GAME_BODY, insertIntoCurrentHouses, CURRENT_FULL_HOUSES, ALL_HOUSES } from './constants';

const DELAY_TIME = 3 * 1000;

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'User\'s turn',
            firstTime: true

        }
        this.houseClicked = this.houseClicked.bind(this);
    }

    houseClicked(e) {
        insertIntoCurrentHouses(e, 'X')
        document.getElementById(e);
        document.getElementById(e).textContent = "X";
        this.computerMove();
        this.setState({ message: 'Computer\'s turn' });
    }

    computerMove(e) {
        if (this.state.firstTime === true) {
            setTimeout(() => {
                this.setState({ message: 'User turn', firstTime: false }, () => {
                    let placementIndex = Math.floor(Math.random() * CURRENT_FULL_HOUSES.length);
                    let initialPlacement = ALL_HOUSES[placementIndex];
                    document.getElementById(initialPlacement).textContent = "O";
                    insertIntoCurrentHouses(initialPlacement, 'O');
                });
            }, DELAY_TIME);
        }
    }

    render() {
        return (
            <Box id="main-div" className="GameBody">
                <Box className="PlayerTurn">{this.state.message}</Box>
                <Box className="EachMapping">
                    {GAME_BODY[0].map((rows, index) =>
                        < Box id={rows} key={index}
                            onClick={() => this.houseClicked(rows)}
                            className="EachRow">
                        </Box>)}
                </Box>
                <Box className="EachMapping">
                    {GAME_BODY[1].map((rows, index) =>
                        < Box id={rows} key={index}
                            onClick={() => this.houseClicked(rows)}
                            className="EachRow">
                        </Box>)}
                </Box>
                <Box className="EachMapping">
                    {GAME_BODY[2].map((rows, index) =>
                        < Box id={rows} key={index}
                            onClick={() => this.houseClicked(rows)}
                            className="EachRow">
                        </Box>)}
                </Box>
            </Box>
        );
    }
}
export default Game;