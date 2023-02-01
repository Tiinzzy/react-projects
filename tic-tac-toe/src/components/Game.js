import React from "react";

import './style.css';

import { body, OCCUPIED_HOUSES, CORNERS, CENTER, EDGES, ROW_OPPOSITE_EDGES, COLUMN_OPPOSITE_EDGES, pushResultIntoBox, checkForEmptyHouse } from './constants';

const DELAY_TIME = 5 * 1000;

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.houseClicked = this.houseClicked.bind(this);
        this.computerMove = this.computerMove.bind(this);
        this.cornerMove = this.cornerMove.bind(this);
        this.centerMove = this.centerMove.bind(this);
        this.edgeMove = this.edgeMove.bind(this);
    }

    houseClicked(e) {
        let whole = document.getElementById('main-div');
        console.log(whole);
        let userResponse = document.getElementById(e);
        document.getElementById(e).textContent = "X";
        let occupiedHouse = userResponse.id;
        OCCUPIED_HOUSES.push(occupiedHouse);
        this.computerMove(occupiedHouse);
    }

    computerMove(userResponse) {

        if (CORNERS.includes(userResponse)) {
            console.log('corner');

            setTimeout(() => {
                this.cornerMove();
            }, DELAY_TIME);
        }

        else if (CENTER.includes(userResponse)) {
            console.log('center');

            setTimeout(() => {
                this.centerMove();
            }, DELAY_TIME);
        }

        else if (EDGES.includes(userResponse)) {
            console.log('edge');
            setTimeout(() => {
                this.edgeMove(userResponse);
            }, DELAY_TIME)
        }
    }

    cornerMove() {
        let computerResponse1 = CENTER[0];
        let emptyHouses = checkForEmptyHouse(EDGES);
        if (OCCUPIED_HOUSES.includes(computerResponse1)) {
            let newComputerResponse1 = Math.floor(Math.random() * emptyHouses.length);
            let randSelect = emptyHouses[newComputerResponse1];
            if (OCCUPIED_HOUSES.includes(randSelect)) {
                return this.cornerMove();
            } else {
                pushResultIntoBox(randSelect);
            }

        } else {
            pushResultIntoBox(computerResponse1);
        }
    }

    centerMove() {
        let computerResponse2 = Math.floor(Math.random() * CORNERS.length);
        let randSelect = CORNERS[computerResponse2];
        pushResultIntoBox(randSelect);
    }

    edgeMove(userMove) {
        let computerResponse3 = CENTER[0];
        if (!OCCUPIED_HOUSES.includes(computerResponse3)) {
            pushResultIntoBox(computerResponse3);
        }
        else if (ROW_OPPOSITE_EDGES.includes(userMove) || COLUMN_OPPOSITE_EDGES.includes(userMove)) {
            let emptyHouses = checkForEmptyHouse(CORNERS);
            let newComputerResponse3 = Math.floor(Math.random() * emptyHouses.length);
            let randSelect = emptyHouses[newComputerResponse3];
            if (OCCUPIED_HOUSES.includes(randSelect)) {
                return this.edgeMove();
            } else {
                pushResultIntoBox(randSelect);
            }
        }
    }

    render() {
        return (
            <div id="main-div" className="GameBody">
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