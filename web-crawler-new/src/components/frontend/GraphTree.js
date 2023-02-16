import React from 'react';

import Box from '@mui/material/Box';
import { Graphviz } from "graphviz-react";
import { LISTENERS } from './messaging';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

let mountCount = 0;

export default class GraphTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            graph: null
        }
    }

    componentDidMount() {
        if (mountCount > 0) {
            let that = this;
            LISTENERS.getTreeData().addEventListener('sending-data-for-tree', (e) => {
                that.setState({ treeData: e.detail.data }, () => {
                    this.initGraph();
                });
            }, false);
            return;
        }
        mountCount += 1;
    }

    initGraph() {
        let tree = this.state.treeData.map(e => (`"${e.parent_id, e.url}"->"${e.url_id, e.url}"`));
        let finalizedTree = [...new Set(tree)];
        let data = `digraph G { ${finalizedTree} }`;
        this.setState({ graph: data })
    }

    render() {
        return (
            <Box id="graph-tree-box">
                {this.state.graph !== null && <Graphviz
                    dot={this.state.graph}
                    options={{ zoom: true, width: '100%', height: '100%', useWorker: false }}
                />}
            </Box>
        );
    }
}