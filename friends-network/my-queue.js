module.exports = class MyQueue {
    constructor(maxSize) {
        this.maxSize = maxSize || 1000;
        this.items = [];
    }

    push(obj) {
        if (this.items.length < this.maxSize) {
            this.items.push(obj);
            return obj;
        } else {
            return null;
        }
    }

    shift() {
        this.items.shift();
    }

    unshift(obj) {
        if (this.items.length < this.maxSize) {
            this.items.unshift(obj);
            return obj;
        } else {
            return null;
        }
    }

    size() {
        return this.items.length;
    }

}
