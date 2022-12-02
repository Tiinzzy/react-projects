const MyQueue = require('./my-queue');

var queue = new MyQueue();

queue.add(100);
queue.add(2);
queue.add(3);
queue.add(4);
queue.add(5);

console.log(queue.size());
console.log(queue);

console.log('-----------')

let a = queue.remove();
console.log(a);
console.log(queue);
