const MyQueue = require('./my-queue');

var queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.push(3);
queue.push(4);
queue.push(5);

console.log(queue.size());
console.log(queue);

console.log('-----------')

queue.shift();
console.log(queue);

console.log('-----------')

queue.shift();
console.log(queue);

console.log('-----------')

queue.shift();
console.log(queue);

// console.log('-----------')

// queue.unshift(1);
// console.log(queue);

