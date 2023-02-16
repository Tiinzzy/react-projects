export const LISTENERS = {
    getTreeData: () => document.getElementById('graph-tree-box'),

}



export function urlArrays2Tree(urls) {
    console.log(urls);

    return  {
        id: 'root',
        name: 'Parent',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                    },
                ],
            },
        ],
    };

}