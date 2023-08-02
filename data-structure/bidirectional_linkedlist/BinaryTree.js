const Node = require('./BrNode');

module.exports = class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(weight) {
        if (this.root === null) {
            this.root = new Node(weight);
        }
        else {
            this.#insert_by_direction(this.root, weight);
        }
    }

    show() {
        this._show_node(this.root);
    }

    node_exist(w) {
        return this.#find_node(this.root, w) !== null;
    }

    #insert_by_direction(node, w) {
        if (node.weight < w) {
            if (node.right === null) {
                node.right = new Node(w);
                return;
            }
            else {
                this.#insert_by_direction(node.right, w);
            }
        }

        else {
            if (node.left === null) {
                node.left = new Node(w);
                return
            }
            else {
                this.#insert_by_direction(node.left, w);
            }
        }
    }


    #show_node(node) {
        if (node === null) {
            return;
        }

        node_str = ' > ' + str(node.weight);
        node_str += ", left: " + (node.left === null ? null : String(node.left.weight));
        node_str += ", right: " + (node.right === null ? null : String(node.right.weight));
        this.#show_node(node.right);
        console.log(node.weight);
        this.#show_node(node.left);
    }


    #find_node(node, w) {
        if (node === null || w === null) {
            return null;
        }
        else if (node.weight === w) {
            return node;
        }
        else if (node.weight < w) {
            return this.#find_node(node.right, w);
        }
        else {
            return this.#find_node(node.left, w);
        }
    }
}