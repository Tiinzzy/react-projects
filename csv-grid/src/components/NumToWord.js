import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { readNumber } from './read_numbers';

class NumToWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            lines: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.breakLine = this.breakLine.bind(this);
    }

    handleChange(e) {
        var number = e.target.value * 1;
        if (!isNaN(number)) {
            var numberAsWords = readNumber(number);
            this.setState({ number: e.target.value, lines: this.breakLine(numberAsWords) });
        }
    }

    breakLine(number) {
        var lines = number.split('break');
        return lines;
    }

    render() {
        return (
            <>
                <Box margin={5}>
                    <TextField label="Enter your number" variant="outlined" value={this.state.number} onChange={(e) => this.handleChange(e)} style={{ width: 600 }} />
                    <Box style={{ marginTop: 25, fontSize: 20, border: 'solid 1px #eaeaea', width: '600px', borderRadius: 3, color: '#36454F' }}>
                        <Box style={{ marginTop: 10, marginBottom: 20, marginLeft: 10 }}>
                            {(this.state.number * 1).toLocaleString()}
                        </Box>

                        <Box style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
                            {this.state.lines.map((e, i) => (<div key={i}>{this.state.lines[i]}{i < this.state.lines.length - 1 ? ' & ' : ''}</div>))}
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
}
export default NumToWord;







