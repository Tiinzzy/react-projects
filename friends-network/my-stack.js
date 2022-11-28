module.exports = class MyStack {
    constructor(maxSize) {
        this.maxSize = maxSize || 1000;
        this.data = [];
    }

    size() {
        return this.data.length;
    }

    push(obj) {
        if (this.data.length < this.maxSize) {
            this.data.push(obj);
            return obj;
        } else {
            return null;
        }
    }

    pop() {
        if (this.data.length > 0) {
            var obj = this.data[this.data.length - 1];
            this.data.splice(-1);
            return obj;
        } else {
            return null;
        }
    }
}
