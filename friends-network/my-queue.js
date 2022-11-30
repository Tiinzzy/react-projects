module.exports = class MyQueue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(item) {
        this.items[this.rear] = item;
        this.rear += 1;
    }

    dequeue() {
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front += 1;
        return item;
    }

    peek() {
        return this.items[this.front];
    }

    size() {
        return this.rear - this.front;
    }

    isEmpty() {
        return this.rear === 0;
    }
}
