module.exports = class MyQueue {
    constructor(maxSize) {
        this.maxSize = maxSize || 1000;
        this.items = [];
    }

    add(obj) {
        this.items.push(obj);
        return obj;
    }

    remove() {
        return this.items.shift();
    }
    
    size() {
        return this.items.length;
    }

}
