export const LISTENERS = {
    getTreeData: () => document.getElementById('graph-tree-box'),

}

function createNode(id, name) {
    return {
        id,
        name,
        children: []
    }
}

export function urlArrays2Tree(urls) {
    let root = createNode('ROOT', 'ROOT');
    let nodes = { 'ROOT': root }
    let defaultExpanded = ['ROOT'];

    for (let u in urls) {
        let node = createNode(urls[u].url_id, urls[u].url);
        let parent_id = urls[u].parent_id;
        nodes[node.id] = node;
        if (nodes[parent_id]) {
            nodes[parent_id].children.push(node);
        }
        defaultExpanded.push(urls[u].url_id);
    }

    return { root, defaultExpanded };
}

export function urlArrays2Tree1(urls) {
    console.log(urls, 'All urls');
    let data = {};
    let allChildren = [];
    let paths = [];

    for (let i = 0; i < urls.length; i++) {
        if (urls[i].parent_id === '1') {
            let id = urls[i].url_id;
            let url = urls[i].url;
            allChildren.push({ 'id': id, 'name': url });
        }
        paths.push(urls[i].url_path);
    }

    let children = createChildrenRelation(urls, allChildren);
    // console.log(children)

    // console.log(allChildren, '< All children')
    data['id'] = 'root';
    data['name'] = urls[0].url;
    data['children'] = children;
    return data
}

function createChildrenRelation(urls, allChildren) {

    let kids = [];

    for (let i = 0; i < urls.length; i++) {
        let want = [urls[i].parent_id, { 'id': urls[i].url_id, 'url': urls[i].url }]
        kids.push(want)
    }

    // console.log(kids, 'kids');

    let child = [];

    for (let i = 0; i < kids.length; i++) {
        let id = urls[i].url_id;
        let url = urls[i].url;
        if (kids[i][0] === allChildren[0].id) {
            child.push({ 'id': id, 'name': url })
            allChildren[0]['children'] = child;
        } else if (kids[i][0] === allChildren[1].id) {
            child = [];
            child.push({ 'id': id, 'name': url })
            allChildren[1]['children'] = child;
        }
    }

    return allChildren

}