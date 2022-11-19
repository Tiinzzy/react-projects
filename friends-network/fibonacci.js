// STUDY THIS https://developer.ibm.com/articles/l-recurs/

var args = process.argv.slice(2);

if (args.length !== 1) {
  console.log('Syntax: node fibonacci.js number');
  return;
} else {
  let n = args[0] * 1;
  if (isNaN(n)) {
    console.log('Syntax is this HONEY: node fibonacci.js number');
    return;
  }
  let result = calcFibonacci2(n);
  showResult(result);
}

// --------------------------------------------------
function showResult(result) {
  console.log(result);
}

// --------------------------------------------------
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …
// 0  1  2  3  4  5  6  7   8   9   10
// --------------------------------------------------
function calcFibonacci1(n) {
  if (n < 0) {
    return 'There is no fibonacci number for n=' + n;
  }

  if (n === 0 || n === 1) {
    return n;
  }

  let a = 0;
  let b = 1;
  let newMemebr;
  for (let i = 2; i <= n; i++) {
    console.log(i);
    newMemebr = a + b;
    a = b;
    b = newMemebr;
  }

  return newMemebr;
}

// --------------------------------------------------
// Recursive calculation method
// --------------------------------------------------
function calcFibonacci2(n) {
  if (n === 0 || n === 1) {
    return n;
  } else {
    return calcFibonacci2(n - 1) + calcFibonacci2(n - 2);
  }
}

// --------------------------------------------------
// 0! = 1
// 1! = 1 * 0!
// 2! = 2 * 1
// 3! = 3 * 2 * 1
// --------------------------------------------------
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return factorial(n - 1) * n;
  }
}