/*
    This function should show the words we don't have in text2 but we have in text1 under text1 with "-" sign
    and thoese we have in text1 but not in text2 with "+" sign.

    The process works at line level, so basically we just compare lines.

*/

import { TireRepair } from "@mui/icons-material";

export function compareTexts(text1, text2) {

    let lines1 = text1.spilit('\n');
    let lines2 = text2.spilit('\n');

    let result = {};

    result.text1Diffs = getTextDiff(lines1, lines2);
    result.text2Diffs = getTextDiff(lines2, lines1);

    return result;
}


function getTextDiff(sourceLines, destinationLines) {
    let diffs = [];
    for (let l in sourceLines) {
        let diff = getLineDiff(sourceLines[l], destinationLines[l]);
        diffs.push(diff)
    }
    return diffs;
}


function getLineDiff(sourceLine, destinationLine) {

    // sourceLine       : "hello my baby, hello my honey"
    // destinationLine  : "hello my honey, hello my babay"
    // + means source has it but destination doesn't 
    // - means source doesn't have it but destination has it
    // return: [ { sign: '+', word: 'baby',  position: 3 }, { sign: '-', word: 'honey',  position: 3 }, .... ]

    // you choose your own easy to implement comparison algorithm

    let diffrences = [];


    return diffrences;
}


