import React from 'react';

import Box from '@mui/material/Box';
import { Graphviz } from "graphviz-react";
import { LISTENERS } from './messaging';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class GraphTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        LISTENERS.getTreeData().addEventListener('sending-data-for-tree', (e) => {
            console.log(e)
        }, false);
    }


    render() {
        return (
            <Box id="graph-tree-box">
                hi
            </Box>
        );
    }
}