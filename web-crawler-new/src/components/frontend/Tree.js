import React, { useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

const data = {
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

export default function Tree(props) {

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return (
        <Box style={{ width: window.innerWidth * 0.75, height: window.innerHeight * 0.75}}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={props.treeData.defaultExpanded}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: '100%', flexGrow: 1, width: '100%' }}
            >
                {renderTree(props.treeData.root)}
            </TreeView>
        </Box>
    );
}