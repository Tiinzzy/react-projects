import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const keyValue = {
    marginRight: 10,
}

export default function ShowResults(props) {

    let negatives = {};
    for (let l in props.diff) {
        let line = props.diff[l];
        for (let w in line) {
            if (line[w].sign === '-') {
                negatives[line[w].position] = line[w].word;
            }
        }
    }

    let positives = [];
    for (let l in props.diff) {
        let line = props.diff[l];
        for (let w in line) {
            if (line[w].sign === '+') {
                positives.push(line[w].word);
            }
        }
    }

    let allWords = [];
    let splitLine = props.text.split("\n").filter(e => e.length > 0);
    // console.log(splitLine);
    for (let l in splitLine) {
        // console.log('lines >>', splitLine[l]);
        // console.log(splitLine[l].split(" "));
        let lines = splitLine[l].split(" ");
        let wordsInLines = [];
        for (let w in lines) {
            wordsInLines.push(lines[w]);
            // console.log(' words >>', lines[w]);
            // console.log(wordsInLines);
        }
        allWords.push(wordsInLines);
        // console.log(wordsInLines);
    }

    return (
        <Box style={{ width: '100%', textAlign: 'left', height: '100%', paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
            <Box style={{ marginBottom: 10 }}>
                {allWords.map((line, i) => (<span key={i}>
                    {line.map((word, w) => (<span key={w} style={{ color: positives.includes(word) ? '#08B500' : ' #353535', backgroundColor: positives.includes(word) && '#CEFFD3' }}>
                        {negatives.hasOwnProperty(w + '') ? <span style={{ color: '#FF0000', backgroundColor: '#FFD9D9' }}>{negatives[w + ''] + ' '}</span> : null}
                        {word + ' '}
                    </span>))}
                </span>))}
            </Box>

            <Divider style={{ marginRight: 10, marginLeft: 2 }} color="#c2185b" />
            <Divider style={{ marginRight: 10, marginLeft: 2 }} />

            <Typography variant="body2" component="div" style={{ marginTop: 10 }}>
                {props.diff.map((line, l) => (<div key={l}>
                    {line.map((diff, d) => (<div key={d}>
                        {diff.sign} {diff.word} @line {diff.lineNo} @position {diff.position}
                    </div>))}
                </div>))}
            </Typography>

            {/* <Divider />
            {JSON.stringify(negatives)}
            <Divider />
            {JSON.stringify(positives)}
            <Divider />
            {JSON.stringify(allWords)} */}

        </Box>
    );
}