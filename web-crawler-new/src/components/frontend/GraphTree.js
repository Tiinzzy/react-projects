import React from 'react';

import Box from '@mui/material/Box';
import { Graphviz } from "graphviz-react";

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();


export default class GraphTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            treeData: props.data,
            graph: null
        }
    }

    componentDidMount() {
        let tree = this.state.treeData.map(e => (`"${e.parent_id}"->"${e.url_id}"`));
        let finalizedTree = [...new Set(tree)];

        finalizedTree.forEach(e => console.log(e));

        let data = 'digraph G { ' + finalizedTree.join(';') + '}';
        console.log(data);
        this.setState({ graph: data })
    }

    render() {
        return (
            <Box id="graph-tree-box">
                {this.state.graph !== null && <Graphviz
                    dot={this.state.graph}
                    options={{ zoom: true, width: 1000, height: 1000, useWorker: false }}
                />}
            </Box>
        );
    }
}