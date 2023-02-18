import React from 'react';

import Box from '@mui/material/Box';
import { Graphviz } from "graphviz-react";

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();


export default class GraphTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            graph: null
        }
    }

    componentDidMount() {
        console.log(this.state.data);

        let urlRelations = {}
        this.state.data.map(e => {
            urlRelations[e.url_id] = e.url;
            urlRelations["ROOT"] = "ROOT";
            // urlRelations["ROOT"] = this.state.treeData[0].url;
        });
        let tree = this.state.data.map(e => (`"${urlRelations[e.parent_id]}"->"${urlRelations[e.url_id]}"`));
        let finalizedTree = [...new Set(tree)];

        let data = 'digraph G { ' + finalizedTree.join(';') + '}';
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