const OrganizationTree = require('./OrganizationTree');
const Node = require('./OrNode');

describe('OrganizationTree', () => {

    it('should add the root node', () => {
        let orgTree = new OrganizationTree();

        const rootNode = orgTree.add_child('Root');
        expect(orgTree.root).toStrictEqual(rootNode);
        expect(rootNode).toBeInstanceOf(Node);
        expect(rootNode.name).toStrictEqual('Root');
        expect(rootNode.children).toHaveLength(0);
    });

    it('should return null when trying to add root node again', () => {
        let orgTree = new OrganizationTree();

        orgTree.add_child('Root');
        const secondRootNode = orgTree.add_child('AnotherRoot');
        expect(secondRootNode).toStrictEqual(null);
    });

    it('should add child node to the parent node', () => {
        let orgTree = new OrganizationTree();

        const rootNode = orgTree.add_child('Root');
        const childNode = orgTree.add_child('Child', rootNode);
        expect(childNode).toBeInstanceOf(Node);
        expect(rootNode.children).toHaveLength(1);
        expect(rootNode.children[0]).toStrictEqual(childNode);
    });


    it('should find the first node with the given name', () => {
        let orgTree = new OrganizationTree();

        const rootNode = orgTree.add_child('Root');
        const childNode = orgTree.add_child('Child', rootNode);
        const foundNode = orgTree.find_first_node('Child');
        expect(foundNode).toStrictEqual(childNode);
    });

    it('should find the first parent node of the given node', () => {
        let orgTree = new OrganizationTree();

        const rootNode = orgTree.add_child('Root');
        const childNode = orgTree.add_child('Child', rootNode);
        const foundParentNode = orgTree.find_first_parent(childNode);
        expect(foundParentNode).toStrictEqual(null);
    });
});
