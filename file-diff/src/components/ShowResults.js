import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function ShowResults(props) {

    let allWords = [];
    if (props.text !== null) {
        let splitLine = props.text.split("\n").filter(e => e.length > 0);
        for (let l in splitLine) {
            let lines = splitLine[l].split(" ");
            let wordsInLines = [];
            for (let w in lines) {
                wordsInLines.push(lines[w]);
            }
            allWords.push(wordsInLines);
        }
    }

    function getPositiveColor(line, position, word) {
        let result = '#000000';
        for (let l in props.diff) {
            for (let [p] in props.diff[l]) {
                if (props.diff[l][p].lineNo * 1 === line && props.diff[l][p].word === word && props.diff[l][p].position * 1 === position) {
                    if (props.diff[l][p].sign === '+') {
                        return '#08B500';
                    }
                }
            }
        }
        return result;
    }

    function getNegativeWord(line, position) {
        let result = null;
        for (let l in props.diff) {
            for (let [p] in props.diff[l]) {
                if (props.diff[l][p].lineNo * 1 === line && props.diff[l][p].position * 1 === position) {
                    if (props.diff[l][p].sign === '-') {
                        return props.diff[l][p].word;
                    }
                }
            }
        }
        return result;
    }

    function getBackColor(line, position, word) {
        for (let l in props.diff) {
            for (let [p] in props.diff[l]) {
                if (props.diff[l][p].lineNo * 1 === line && props.diff[l][p].position * 1 === position && props.diff[l][p].word === word) {
                    if (props.diff[l][p].sign === '+') {
                        return '#CEFFD3';
                    }
                }
            }
        }
    }

    return (
        <Box style={{ width: '100%', textAlign: 'left', height: '100%', paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
            {allWords.length > 0 && <>
                <Box style={{ marginBottom: 10 }}>
                    {allWords.map((line, l) => (<Box key={l}>
                        {line.map((word, w) => (<span key={w} style={{ color: getPositiveColor(l, w, word), backgroundColor: getBackColor(l, w, word) }}>
                            <span style={{ color: '#FF0000', backgroundColor: '#FFD9D9' }}> {getNegativeWord(l, w)} </span>
                            {word + ' '}
                        </span>))}
                        {props.diff[l].filter((e) => e.extra).map((diff, d) => (<span key={d}>
                            <span style={{ color: '#0041E2', backgroundColor: "#C6DCFF" }}>{diff.word + ' '}</span>
                        </span>))}
                    </Box>))}
                </Box>

                <Divider style={{ marginRight: 10, marginLeft: 2 }} color="#c2185b" />
                <Divider style={{ marginRight: 10, marginLeft: 2 }} />

                <Typography variant="body2" component="div" style={{ marginTop: 10 }}>
                    {props.diff.map((line, l) => (<Box key={l}>
                        {line.map((diff, d) => (<Box key={d}>
                            {diff.sign} {diff.word} @line {diff.lineNo} @position {diff.position}
                        </Box>))}
                    </Box>))}
                </Typography>
            </>}
        </Box>
    );
}

