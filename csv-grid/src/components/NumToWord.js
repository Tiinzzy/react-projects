import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class NumToWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({ number: e.target.value });
    }

    handleClick() {

        console.log(this.state.number);
    }

    render() {
        return (
            <>
                <Box margin={5}>
                    <TextField label="Enter your number" variant="outlined" value={this.state.number} onChange={(e) => this.handleChange(e)} />
                    <Button variant="contained" onClick={() => this.handleClick()}>Convert</Button>
                </Box>

            </>
        );
    }
}
export default NumToWord;

