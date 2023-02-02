import React from "react";

import Box from '@mui/material/Box'

import './style.css';

import { GAME_BODY, insertIntoCurrentHouses } from './constants';

const DELAY_TIME = 1000;

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'User\'s turn',

        }
        this.houseClicked = this.houseClicked.bind(this);
    }

    houseClicked(e) {
        insertIntoCurrentHouses(e, 'X')
        document.getElementById(e);
        document.getElementById(e).textContent = "X";
        this.setState({ message: 'Computer\'s turn' })
    }

    computerMove(e) {
        if (e) {
            setTimeout(() => {
                this.setState({ message: 'User turn' });
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