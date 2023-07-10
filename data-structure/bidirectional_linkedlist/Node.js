module.exports = class Node {
  constructor(payload) {
    this.payload = payload;
    this.next = null;
    this.previous = null;
  }
}