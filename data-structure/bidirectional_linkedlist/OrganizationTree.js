const Node = require('./OrNode');

module.exports = class OrganizationTree {
    constructor() {
        this.root = null;
    }

    add_child(name, parent = null) {
        if (parent === null) {
            if (this.root === None) {
                this.root = new Node(name);
                return this.root;
            } else {
                return null;
            }
        } else {
            let child = new Node(name);
            parent.children.push(child);
            return child;
        }
    }

    find_first_node(name) {
        return this.#travers_node_until_find(this.root, name);
    }

    show_org_chart() {
        this._print_node(this.root, 2);
    }

    find_first_parent(node) {
        return this.#traverse_parent_nodes(this.root, node);
    }

    add_sibling(parent, newChild) {
        let child = new Node(newChild);
        parent.children.push(child);
        return true;
    }

    #traverse_parent_nodes(currentNode, targetNode, parent_node = None) {
        if (currentNode.name === targetNode) {
            return parent_node;
        } else {
            for (let i = 0; i < currentNode.children.length; i++) {
                const child = currentNode.children[i];
                const result = traverseParentNodes(child, targetNode, currentNode);
                if (result !== null) {
                    return result;
                }
            }
            return null;
        }
    }

    #travers_node_until_find(node, name) {
        if (node.name === name) {
            return node;
        } else {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                const result = traverseNodeUntilFind(child, name);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }

    #print_node( node, depth){
        const blank = (depth < 2) ? '' : ' '.repeat(depth - 2);
        console.log(blank + '+-' + node.name);
    
        for (let i=0; i< node.children.length; i++){
            const child = node.children[i];
            const new_depth = depth + 1;
            this.#print_node(child, new_depth);
        }
    }
}
