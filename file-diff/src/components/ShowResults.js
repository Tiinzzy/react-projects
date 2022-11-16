import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

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
                if (props.diff[l][p].lineNo * 1 === line && props.diff[l][p].position * 1 === position && props.diff[l][p].word === word) {
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
                    {allWords.map((line, i) => (<div key={i}>
                        {line.map((word, w) => (<span key={w} style={{ color: getPositiveColor(i, w, word), backgroundColor: getBackColor(i, w, word) }}>
                            <span style={{ color: '#FF0000', backgroundColor: '#FFD9D9' }}> {getNegativeWord(i, w)} </span>
                            {word + ' '}
                        </span>))}
                    </div>))}
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
            </>}
            {/* {JSON.stringify(props.diff)} */}
        </Box>
    );
}