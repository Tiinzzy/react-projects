const BinaryTree = require('./BinaryTree');

describe('BidirectionalLinkedList', () => {

    it('should add elements correctly', () => {
        let br_tree = new BinaryTree();

        br_tree.insert(40);
        br_tree.insert(39);
        br_tree.insert(41);
        br_tree.insert(38);
        br_tree.insert(47);

        expect(br_tree.node_exist(39)).toStrictEqual(true);
        expect(br_tree.node_exist(40)).toStrictEqual(true);
        expect(br_tree.node_exist(41)).toStrictEqual(true);
        expect(br_tree.node_exist(38)).toStrictEqual(true);
        expect(br_tree.node_exist(47)).toStrictEqual(true);
    });

    it('should add a node correctly', () => {
        let br_tree = new BinaryTree();

        br_tree.insert(5);

        expect(br_tree.root.weight).toStrictEqual(5);
        expect(br_tree.root.left).toBeNull();
        expect(br_tree.root.right).toBeNull();
    });

    it('should insert multiple nodes correctly', () => {
        let br_tree = new BinaryTree();

        br_tree.insert(5);
        br_tree.insert(3);
        br_tree.insert(7);
        br_tree.insert(2);
        br_tree.insert(4);
        br_tree.insert(6);
        br_tree.insert(8);

        expect(br_tree.root.weight).toStrictEqual(5);
        expect(br_tree.root.left.weight).toStrictEqual(3);
        expect(br_tree.root.right.weight).toStrictEqual(7);
        expect(br_tree.root.left.left.weight).toStrictEqual(2);
        expect(br_tree.root.left.right.weight).toStrictEqual(4);
        expect(br_tree.root.right.left.weight).toStrictEqual(6);
        expect(br_tree.root.right.right.weight).toStrictEqual(8);
    });

    it('should check if a node exists correctly', () => {
        let br_tree = new BinaryTree();

        br_tree.insert(5);
        br_tree.insert(3);
        br_tree.insert(7);
        br_tree.insert(2);
        br_tree.insert(4);

        expect(br_tree.node_exist(5)).toBe(true);
        expect(br_tree.node_exist(3)).toBe(true);
        expect(br_tree.node_exist(7)).toBe(true);
        expect(br_tree.node_exist(2)).toBe(true);
        expect(br_tree.node_exist(4)).toBe(true);
        expect(br_tree.node_exist(6)).toBe(false);
        expect(br_tree.node_exist(8)).toBe(false);
    });

});
