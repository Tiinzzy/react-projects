const MyQueue = require('./my-queue');

var queue = new MyQueue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);

console.log(queue.size());
console.log(queue);


console.log('-----------')

queue.dequeue()

console.log(queue.size());
console.log(queue);
