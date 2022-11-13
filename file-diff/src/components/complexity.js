function orderN(n) {
    function doSometing() {
        // this task may take 1 second or 10 seconds
    }

    for (let i = 1; i <= n; i++) {
        doSometing();
    }

}

// on algorithm time complexity just the starting point
// YOU NEED TO READ THIS => https://en.wikipedia.org/wiki/Time_complexity
function orderExample() {
    let data = [];
    let n = 987521;

    // this algorithm is called O(n) <= read big o n
    for (let i = 0; i < n; i++) {
        data.push(Math.sin(100 * Math.PI * i));
    }

    // this algorithm is also called O(n) <= read big o n
    for (let i = 0; i < n; i++) {
        if (data[i] === 0) {
            console.log(i);
        }
    }

    // this algorithm is also called O(n^2) <= read big o n^2
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (data[i] === data[j]) {
                console.log(i, j);
            }
        }
    }

    // this algorithm is also called O(n) <= read big o n
    for (let i = 0; i < 4 * n; i++) {
        if (data[i % n] === 0) {
            console.log(i);
        }
    }

    // this is linear search in fact
    function ifWordExist(wordList, word) {
        wordList = wordList || [];
        word = word || '';

        for (let i = 0; i < wordList.length; i++) {
            if (wordList[i] === word) {
                return true;
            }
        }

        return false;
    }

    let words = ["The", "milkman", "brought", "donuts", "cheese", "along",
        "with", "milk", "and", "a", "bottle", "of", "whiskey", "to", "10", "houses"];

    console.log(ifWordExist(words, 'The'));
    console.log(ifWordExist(words, '10'));
    console.log(ifWordExist(words, 'Ponyo'));

    /*
    // this algorithm has O(n^2) complexity
    {
        O(n)

        O(n ^ 2)

        O(log(n))
    }

    // this algorithm has O(n^3 log(n)) complexity
    {
        O(n) * O(n ^ 2) * O(log(n))
    }

    myArray = [ 10, 2, 4, 5, 6, 100, ..., 36]
    what is the complexity of accesing 4th element? O(1)
    what is the complexity of searchning for 100? O(n)

    myLinkedList = 10 -> 2 -> 4 -> 5 -> 6 -> 100 -> ... -> 36
    what is the complexity of accesing 4th element? O(n)
    what is the complexity of searchning for 100 element? O(n)

    */
}