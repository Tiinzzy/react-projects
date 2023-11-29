import React from "react";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class SearchDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            depth: '',
            erroMsg: '',
            treeData: null
        }
    }

    getPath(e) {
        this.setState({ path: e.target.value, erroMsg: '', treeData: null });
    }

    getDepth(e) {
        this.setState({ depth: e.target.value * 1, erroMsg: '', treeData: null });
    }

    searchGetTree() {
        if (this.state.depth.length !== 0 || this.state.path.length !== 0) {
            let query = { 'depth': this.state.depth * 1, 'path': this.state.path };
            backend.get_directory_path(query, (data) => {
                this.setState({ treeData: this.createTreeItems(data) });
            });

        } else {
            this.setState({ erroMsg: 'PLease fill in all fields!' })
        }
    }

    createTreeItems(data, parentId = null) {
        return data.map((item, index) => {
            const nodeId = parentId ? `${parentId}-${index}` : `root-${index}`;
            return (
                <TreeItem key={nodeId} nodeId={nodeId} label={item.name}>
                    {item.children && item.children.length > 0 ? this.createTreeItems(item.children, nodeId) : null}
                </TreeItem>
            );
        });
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 5, padding: 20 }}>
                <TextField label="Directory Path" variant="outlined" onChange={(e) => this.getPath(e)} />
                <TextField label="Depth Level" variant="outlined" sx={{ mt: 3 }} onChange={(e) => this.getDepth(e)} />
                <Box style={{ display: 'flex', marginTop: 15 }}>
                    {this.state.erroMsg.length > 0 && <Typography color="crimson">{this.state.erroMsg}</Typography>}
                    <Box flexGrow={1} />
                    <Button variant="outlined" onClick={() => this.searchGetTree()}>Search</Button>
                </Box>
                <Divider sx={{ mt: 1 }} />
                {this.state.treeData &&
                    <TreeView aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}>
                        {this.state.treeData}
                    </TreeView>
                }
            </Box>
        );
    }
}
export default SearchDirectory;