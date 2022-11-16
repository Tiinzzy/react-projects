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
    let splitText = props.text.split(' ');
    for (let w in splitText) {
        allWords.push(splitText[w].replace('\n', ''))
    }


    return (
        <Box style={{ width: '100%', textAlign: 'left', height: '100%', paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
            <Box style={{ marginBottom: 10 }}>
                {allWords.map((w, i) => (<span key={i} style={{ color: positives.includes(w) ? '#08B500' : ' #353535', backgroundColor: positives.includes(w) && '#CEFFD3' }}>
                    {negatives.hasOwnProperty(i + '') ? <span style={{ color: '#FF0000', backgroundColor: '#FFD9D9' }}>{negatives[i + ''] + ' '}</span> : null}
                    {w + ' '}
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