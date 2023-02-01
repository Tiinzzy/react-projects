import React from "react";

import './style.css';

import { giveNUmValue, body, fullHouses, userChoices, computerChoices, occupiedHouses, ALL_HOUSES } from './constants';

const DELAY_TIME = 1000;

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'User\'s turn'

        }
        this.houseClicked = this.houseClicked.bind(this);
    }

    houseClicked(e) {
        let userResponse = document.getElementById(e);
        document.getElementById(e).textContent = "X";

        //getting user input
        occupiedHouses(1, userChoices);

        // putting each selection into the right house
        occupiedHouses(1, fullHouses);

        this.computerMove(e);
        this.setState({ message: 'Computer\'s turn' })
    }

    computerMove(e) {
        let userInput = giveNUmValue(e);
        if ((fullHouses[0].includes(userInput) || fullHouses[1].includes(userInput) || fullHouses[2].includes(userInput))) {
            setTimeout(() => {
                this.cornerMove();
                this.setState({ message: 'User turn' });
            }, DELAY_TIME);
        }
    }

    cornerMove() {
        let initRes = Math.floor(Math.random() * ALL_HOUSES.length);
        let compSlect = ALL_HOUSES[initRes];
        if ((!fullHouses[0].includes(compSlect) || !fullHouses[1].includes(compSlect) || !fullHouses[2].includes(compSlect))) {
            document.getElementById(compSlect).textContent = "O";
            occupiedHouses(0, fullHouses);
            occupiedHouses(0, computerChoices)

        } else {
            // 
            this.cornerMove();
        }
    }

    render() {
        return (
            <div id="main-div" className="GameBody">
                <div className="PlayerTurn">{this.state.message}</div>
                <div className="EachMapping">
                    {body[0].map((rows, index) =>
                        < div id={rows} key={index}
                            onClick={() => this.houseClicked(rows)}
                            className="EachRow">
                        </div>)}
                </div>
                <div className="EachMapping">
                    {body[1].map((rows, index) =>
                        < div id={rows} key={index}
                            onClick={() => this.houseClicked(rows)}
                            className="EachRow">
                        </div>)}
                </div>
                <div className="EachMapping">
                    {body[2].map((rows, index) =>
                        < div id={rows} key={index}
                            onClick={() => this.houseClicked(rows)}
                            className="EachRow">
                        </div>)}
                </div>
            </div>
        );
    }
}
export default Game;