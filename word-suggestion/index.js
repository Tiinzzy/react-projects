var fs = require('fs');
var tokenizer = require('./tokenizer');
var graphviz = require('graphviz');
var Word = require('./Word');

var text = readCelanFile('document.txt');
var tokens = tokenizeText(text.toLocaleLowerCase());
var allWords = getAllWords();

buildRelationship();
drawGraph();


// ------------------------------------------------
function readCelanFile(filename) {
    var data = fs.readFileSync(filename, 'utf8');
    var regex = /[!“”‘’"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    data = data.replace(regex, '');
    return data;
}


// ------------------------------------------------
function tokenizeText(data) {
    tokenizer.debug = false;
    tokenizer.rule('newline', /^\n/);
    tokenizer.rule('whitespace', /^\s+/);
    tokenizer.rule('function', /^fn [^\s]+/);
    tokenizer.rule('string', /^\'.+\'/);
    tokenizer.rule('word', /^[^\s]+/);
    return tokenizer.tokenize(data).filter(t => t !== ' ' && t !== '\n');
}


// ------------------------------------------------
function getAllWords() {
    var allWords = {};
    [...new Set(tokens)].forEach(t => {
        allWords[t] = new Word(t);
    })
    return allWords;
}


// ------------------------------------------------
function buildRelationship() {
    for (var i = 0; i < tokens.length - 1; i++) {
        var curentWord = allWords[tokens[i]];
        var nextWord = allWords[tokens[i + 1]];
        curentWord.addNextWord(nextWord);
    }
}


// ------------------------------------------------
function drawGraph() {
    var g = graphviz.digraph("G");
    g.setGraphVizPath("/usr/bin");

    Object.values(allWords).forEach(w => {
        g.addNode(w.getTerm());
    });

    Object.values(allWords).forEach(w => {
        var fromTerm = w.getTerm();
        Object.values(w.getNextWords()).forEach(nw => {
            var toTerm = nw.word.getTerm();
            g.addEdge(fromTerm, toTerm, { "minlen": 1, "label": nw.count });
        });
    });

    g.output("svg", "/home/tina/Downloads/word-relationship.svg");
}