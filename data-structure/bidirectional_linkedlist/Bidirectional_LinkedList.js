const Node = require('./Node');


module.exports = class BidirectionalLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  get_head() {
    return this.head.payload;
  }

  get_tail() {
    return this.tail.payload;
  }

  add(payload, index = null) {
    const node = new Node(payload);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      this.size += 1;
      return true;
    } else if (index === null) {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
      this.size += 1;
      return true;
    } else {
      if (index < 0 || index >= this.size) {
        return false;
      } else if (index === 0) {
        node.next = this.head;
        this.head = node;
        this.head.next.previous = this.head;
        this.size += 1;
        return true;
      } else {
        let previousNode = this.head;
        for (let i = 0; i < index - 1; i++) {
          previousNode = previousNode.next;
        }
        node.next = previousNode.next;
        node.previous = previousNode;
        previousNode.next = node;
        node.next.previous = node;
        this.size += 1;
        return true;
      }
    }
  }

  remove_when_size_one() {
    const lastNode = this.head;
    this.head = null;
    this.tail = null;
    this.size = 0;
    return lastNode.payload;
  }

  remove_from_list(node) {
    node.next = null;
    node.previous = null;
    this.size -= 1;
    return node.payload;
  }

  remove(index = undefined) {
    if (this.head === null) {
      return null;
    } else if (index === undefined) {
      if (this.size === 1) {
        return this.remove_when_size_one();
      } else {
        const lastNode = this.tail;
        this.tail = lastNode.previous;
        this.tail.next = null;
        return this.remove_from_list(lastNode);
      }
    } else {
      if (index < 0 || index >= this.size) {
        return null;
      } else if (index === 0) {
        if (this.size === 1) {
          return this.remove_when_size_one();
        } else {
          const firstNode = this.head;
          this.head = this.head.next;
          this.head.previous = null;
          return this.remove_from_list(firstNode);
        }
      } else {
        let nodePointer = this.head;
        for (let i = 0; i < index; i++) {
          nodePointer = nodePointer.next;
        }
        nodePointer.next.previous = nodePointer.previous;
        nodePointer.previous.next = nodePointer.next;
        return this.remove_from_list(nodePointer);

        // for (let i = 0; i < this.size; i++) {
        //   if (i === index) {
        //     nodePointer.previous.next = nodePointer.next;
        //     nodePointer.next.previous = nodePointer.previous;
        //     return this.remove_from_list(nodePointer);
        //   }
        //   nodePointer = nodePointer.next;
        // }
      }
    }
  }

  show_all(reverse = false) {
    if (reverse) {
      let node = this.tail;
      let result = '';
      while (node !== null) {
        result = ' <-- ' + String(node.payload) + result;
        node = node.previous;
      }
      return result;
    } else {
      let node = this.head;
      let result = '';
      while (node !== null) {
        result = result + String(node.payload) + ' --> ';
        node = node.next;
      }
      return result;
    }
  }

  get_element(index = null) {
    let nodePointer = this.head;
    if (index === null) {
      return this.tail.payload;
    } else if (index === 0) {
      return this.head.payload;
    } else {
      if (index < 0 || index > this.size) {
        return null;
      } else {
        for (let i = 0; i < index; i++) {
          nodePointer = nodePointer.next;
        }
        return nodePointer.payload;
      }
    }
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  find_first(search_function) {
    let firstNotFound = true;
    let nodePointer = this.head;
    while (firstNotFound && this.size > 0 && nodePointer !== null) {
      if (search_function(nodePointer.payload)) {
        return nodePointer.payload;
      }
      nodePointer = nodePointer.next;
    }
    return null;
  }
}
