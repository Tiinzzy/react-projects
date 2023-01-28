import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

import './style.css'

const GAME_OPTIONS = ['images/paper.svg', 'images/rock.svg', 'images/scissors.svg'];

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            computerDisplay: false,
            userChoise: null,
            userDisplay: false,
            userSelect: false
        }
        this.startGame = this.startGame.bind(this);
        this.userSelected = this.userSelected.bind(this);
        this.ResetGame = this.ResetGame.bind(this);
    }


    startGame() {
        let randomSelection = Math.floor(Math.random() * GAME_OPTIONS.length);
        this.setState({ randomSelection: randomSelection, computerDisplay: true });
    }

    userSelected(index) {
        if (index === 'rock') {
            this.setState({ computerDisplay: true, userChoise: index, userDisplay: true, userSelect: true }, () => {
                if (this.state.userChoise && this.state.randomSelection === 1) {
                    this.setState({ result: 'Draw' })
                } else if (this.state.userChoise && this.state.randomSelection === 0) {
                    this.setState({ result: 'Computer Wins!' })
                } else if (this.state.userChoise && this.state.randomSelection === 2) {
                    this.setState({ result: 'You Win!' })
                }
            });
        } else if (index === 'paper') {
            this.setState({ computerDisplay: true, userChoise: index, userDisplay: true, userSelect: true }, () => {
                if (this.state.userChoise && this.state.randomSelection === 0) {
                    this.setState({ result: 'Draw' })
                } else if (this.state.userChoise && this.state.randomSelection === 1) {
                    this.setState({ result: 'You Win!' })
                } else if (this.state.userChoise && this.state.randomSelection === 2) {
                    this.setState({ result: 'Computer Wins!' })
                }
            });
        } else if (index === 'scissors') {
            this.setState({ computerDisplay: true, userChoise: index, userDisplay: true, userSelect: true }, () => {
                if (this.state.userChoise && this.state.randomSelection === 2) {
                    this.setState({ result: 'Draw' })
                } else if (this.state.userChoise && this.state.randomSelection === 0) {
                    this.setState({ result: 'You Win!' })
                } else if (this.state.userChoise && this.state.randomSelection === 1) {
                    this.setState({ result: 'Computer Wins!' })
                }
            });
        }
    }

    ResetGame() {
        this.setState({ computerDisplay: false, userChoise: null, userDisplay: false, userSelect: false, result: '', randomSelection: null });
    }

    render() {
        return (
            <Box style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center',
                margin: 'auto', border: 'solid 3px #73a5f5', padding: 20,
                width: 500, height: 250,borderRadius: 5
            }}>
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, marginBottom: 100 }}>
                    {this.state.userSelect === false && this.state.computerDisplay === false &&
                        <Box>
                            <Button variant="contained" onClick={() => this.startGame()} style={{ marginBottom: 20 }}>
                                CLick to play
                            </Button>
                        </Box>}
                    {this.state.userSelect === false && this.state.computerDisplay === true &&
                        <Typography mb={2}>Select your prompt for your play:</Typography>}
                    {this.state.userSelect === false && this.state.computerDisplay === true &&
                        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <span className="SelectingPrompt" ><img alt="#" src='images/rock.svg' width="40" height="40" style={{ border: 'none', cursor: 'pointer' }} onClick={() => this.userSelected('rock')} /> </span>
                            <span className="SelectingPrompt" ><img alt="#" src='images/paper.svg' width="40" height="40" style={{ border: 'none', cursor: 'pointer' }} onClick={() => this.userSelected('paper')} /> </span>
                            <span className="SelectingPrompt" ><img alt="#" src='images/scissors.svg' width="40" height="40" style={{ border: 'none', cursor: 'pointer' }} onClick={() => this.userSelected('scissors')} /> </span>
                        </Box>}

                    {this.state.result &&
                        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, border: 'solid 0px red', padding: 10 }}>
                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'solid 0px black', marginRight: 6, width: 150 }}>
                                {this.state.userChoise !== null &&
                                    <img alt="#" src={'images/' + this.state.userChoise + '.svg'} width="40" height="40" style={{ border: 'none', marginBottom: 10 }} />}
                                <Typography mt={1} variant="h6" style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>You</Typography>
                            </Box>
                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'solid 0px blue', width: 150 }}>
                                {this.state.computerDisplay !== false &&
                                    <img alt="#" src={GAME_OPTIONS[this.state.randomSelection]} width="40" height="40" style={{ border: 'none', marginBottom: 10 }} />}
                                <Typography mt={1} variant="h6" style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Computer</Typography>
                            </Box>
                        </Box>}
                    {this.state.result &&
                        <Typography variant="h6" mt={1} style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Result</Typography>}
                    {this.state.result}
                    {this.state.result &&
                        <Box style={{ marginTop: 15, marginBottom: 10 }}>
                            <Button variant="contained" onClick={() => this.ResetGame()}>
                                Restart
                            </Button>
                        </Box>}
                </Box>
            </Box>
        );
    }
}
export default Game;