module.exports = class Word {
    constructor(term) {
        this.term = term;
        this.nextWords = {};
    }

    getNextWords() {
        return this.nextWords;
    }

    getTerm() {
        return this.term;
    }

    addNextWord(word) {
        if (!this.nextWords.hasOwnProperty(word.getTerm())) {
            this.nextWords[word.getTerm()] = { word: word, count: 0 };
        }
        this.nextWords[word.getTerm()].count = this.nextWords[word.getTerm()].count + 1;
    }

    summary() {
        return this.term;
    }
}