import React from 'react';

import Box from '@mui/material/Box';

import { LISTENERS } from './messaging';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

let mountCount = 0;

export default class Tree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if (mountCount > 0) {
            let that = this;
            LISTENERS.getTreeData().addEventListener('sending-data-for-tree', (e) => {
                that.setState({ treeData: e.detail.data });
            }, false);
            return;
        }
        mountCount += 1;
    }


    render() {
        return (
            <Box id="graph-tree-box">
              {/* https://mui.com/material-ui/react-tree-view/ */}
            </Box>
        );
    }
}