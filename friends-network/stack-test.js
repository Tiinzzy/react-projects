const MyStack = require('./my-stack');

var stack = new MyStack();

console.log(stack.size());

stack.push({ name: 'kamran' });
console.log(stack.size());

console.log(stack.pop());

console.log(stack.pop());

var s = "Hello World";

s.split('').forEach(c => {
    stack.push(c);
});

var r = '';
while (stack.size() > 0) {
    r += stack.pop();
}
console.log(r);

