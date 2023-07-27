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
        expect(foundParentNode).toStrictEqual(rootNode);
    });

    it('should add a sibling node to the parent node', () => {
        let orgTree = new OrganizationTree();

        const rootNode = orgTree.add_child('Root');
        const childNode1 = orgTree.add_child('Child1', rootNode);
        const childNode2 = orgTree.add_sibling(childNode1, 'Child2');
        expect(childNode2).toBeInstanceOf(Node);
        expect(rootNode.children).toHaveLength(2);
        expect(rootNode.children[1]).toStrictEqual(childNode2);
    });

    it('should show the organization chart', () => {
        let orgTree = new OrganizationTree();

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        const rootNode = orgTree.add_child('Root');
        const childNode1 = orgTree.add_child('Child1', rootNode);
        orgTree.add_child('Child2', rootNode);
        orgTree.add_child('Grandchild1', childNode1);
        orgTree.show_org_chart();
        expect(consoleSpy).toHaveBeenCalledWith('+-' + rootNode.name);
        expect(consoleSpy).toHaveBeenCalledWith('  +-Child1');
        expect(consoleSpy).toHaveBeenCalledWith('    +-Grandchild1');
        expect(consoleSpy).toHaveBeenCalledWith('  +-Child2');
        consoleSpy.mockRestore();
    });
});
