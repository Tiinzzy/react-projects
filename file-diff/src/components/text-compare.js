/*
    This function should show the words we don't have in text2 but we have in text1 under text1 with "-" sign
    and thoese we have in text1 but not in text2 with "+" sign.

    The process works at line level, so basically we just compare lines.

*/

export function compareTexts(text1, text2) {

    let lines1 = text1.split('\n');
    let lines2 = text2.split('\n');

    let result = {};

    result.diff1 = getTextDiff(lines1, lines2);
    result.diff2 = getTextDiff(lines2, lines1);

    return result;
}


function getTextDiff(sourceLines, destinationLines) {
    let diffs = [];
    for (let l in sourceLines) {
        if (l < destinationLines.length) {
            let diff = getLineDiff(sourceLines[l], destinationLines[l]);
            diffs.push(diff)
        }
    }
    return diffs;
}


function getLineDiff(sourceLine, destinationLine) {
    let sourceWords = sourceLine.split(" ");
    let destinationWords = destinationLine.split(" ");

    // + means source has it but destination doesn't 
    // - means source doesn't have it but destination has it
    // return: [ { sign: '+', word: 'baby',  position: 3 }, { sign: '-', word: 'honey',  position: 3 }, .... ]

    // you choose your own easy to implement comparison algorithm
    let diffrences = [];

    for (let s = 0; s < sourceWords.length; s++) {
        let sw = sourceWords[s];
        if (s < destinationWords.length) {
            let dw = destinationWords[s];
            if (dw !== sw) {
                diffrences.push({ 'sign': '-', 'word': dw, 'position': s });
                diffrences.push({ 'sign': '+', 'word': sw, 'position': s });
            }
        } else {
            diffrences.push({ 'sign': '+', 'word': sw, 'position': s });
        }
    }

    return diffrences;
}


