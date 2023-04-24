import React from "react";

import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Dialog from '@mui/material/Dialog';

import UilDatabase from '@iconscout/react-unicons/icons/uil-database';
import UilFileAlt from '@iconscout/react-unicons/icons/uil-file-alt';

import BackEndConnection from './BackEndConnection';
import InsertDocumentNewCollection from './InsertDocumentNewCollection';

import './style.css';


const backend = BackEndConnection.INSTANCE();

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionInfo: props.connectionInfo,
            getDataforDocuments: props.getDataforDocuments,
            openList: false,
            openCollections: '',
            selectedId: '',
            selectedDb: '',
            openDialog: false
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    componentDidMount() {
        backend.get_databases_mongo_db(this.state.connectionInfo, (data) => {
            let that = this;
            that.setState({ databases: data.available_databases });
        })
    }

    handleOPenList() {
        this.setState({ openList: !this.state.openList });
    }

    getCollections(e) {
        if (this.state.openCollections === '') {
            this.setState({ selectedDb: e });
            let query = { 'host_name': this.state.connectionInfo.host, 'port_name': this.state.connectionInfo.port, 'database_name': e };
            backend.get_collections_mongo_db(query, (data) => {
                let that = this;
                that.setState({ openCollections: e, collections: data.collections })
            });
        } else {
            this.setState({ openCollections: '' });
        }
    }

    getDocuments(db, col) {
        let query = { action: 'ready-to-fetch', database: db, collection: col }
        this.state.getDataforDocuments(query);
        this.setState({ database: db, collection: col, selectedId: col })
    }

    reLoadContent() {
        let query = { action: 'reload-page', database: this.state.database, collection: this.state.collection }
        this.state.getDataforDocuments(query);
        this.componentDidMount();
    }

    insertInNewCollection() {
        this.setState({ openDialog: true });
    }

    handleCloseDialog() {
        this.setState({ openDialog: false });
    }

    render() {
        return (
            <>
                <IconButton color="black" title="reload data" onClick={() => this.reLoadContent()}>
                    <ReplayOutlinedIcon />
                </IconButton>
                <IconButton color="black" title="insert document in new collection" onClick={() => this.insertInNewCollection()} >
                    <AddCircleOutlineOutlinedIcon />
                </IconButton>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}
                    component="nav">
                    <ListItemButton onClick={() => this.handleOPenList()}>
                        <UilDatabase size="25" color="black" />
                        <ListItemText primary="Databases" sx={{ marginLeft: 2 }} />
                        {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            {this.state.databases && this.state.databases.map((e, i) => (
                                <Box key={i} >
                                    <ListItemButton sx={{ pl: 4 }} onClick={() => this.getCollections(e)}>
                                        <UilDatabase size="15" color="black" />
                                        <ListItemText primary={e} sx={{ marginLeft: 1.5 }}
                                            style={{ color: this.state.selectedDb === e ? '#1589FF' : 'black' }}
                                            onClick={() => this.setState({ selectedDb: e })} />
                                        {this.state.openCollections === e ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={this.state.openCollections === e} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {this.state.collections && this.state.collections.map((ee, i) => (
                                                <ListItemButton key={i} sx={{ pl: 8 }} onClick={() => this.getDocuments(e, ee)}>
                                                    <UilFileAlt size="15" color="black" />
                                                    <ListItemText primary={ee} sx={{ marginLeft: 1.5 }}
                                                        style={{ color: this.state.selectedId === ee ? '#1589FF' : 'black' }}
                                                        onClick={() => this.setState({ selectedId: ee })} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </Box>
                            ))}
                        </List>
                    </Collapse>
                </List>
                <Dialog maxWidth="xl" open={this.state.openDialog} onClose={() => this.handleCloseDialog()}>
                    <InsertDocumentNewCollection handleCloseDialog={this.handleCloseDialog} />
                </Dialog>
            </>
        );
    }
}