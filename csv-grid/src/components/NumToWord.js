import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function convertNumberToWords(num) {
    let single = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    let couple = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninty'];
    let triple = ['hundred'];
    let output = '';
    let numToString = num.toString();

    if (num === 0) {
        return 'zero';
    }

    if (num === 100) {
        return 'hundred';
    }

    if (num < 20) {
        output = single[num];
        return output;
    }

    if (numToString.length === 3) {
        output = single[parseInt(numToString.charAt(0))] + triple;
        output += couple[parseInt(numToString.charAt(1))];
        output += single[parseInt(numToString.charAt(2))];
        return output;
    }

    output += couple[parseInt(numToString.charAt(0))];
    output += single[parseInt(numToString.charAt(1))];
    return output;

}


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

        console.log(convertNumberToWords(this.state.number));
    }

    render() {
        return (
            <>
                <Box margin={5}>
                    <TextField label="Enter your number" variant="outlined" value={this.state.number} onChange={(e) => this.handleChange(e)}/>
                    <Button variant="contained" onClick={() => this.handleClick()} style={{margin: 10}}>Convert</Button>
                </Box>

            </>
        );
    }
}
export default NumToWord;

