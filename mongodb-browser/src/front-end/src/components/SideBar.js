import React from "react";

import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import './style.css';
import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionInfo: props.connectionInfo,
            openList: false,
            openCollections: ''
        }
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
            let query = { 'host_name': this.state.connectionInfo.host, 'port_name': this.state.connectionInfo.port, 'database_name': e };
            backend.get_collections_mongo_db(query, (data) => {
                let that = this;
                that.setState({ openCollections: e, collections: data.collections })
            });
        } else {
            this.setState({ openCollections: '' });
        }
    }

    render() {
        return (
            <>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}
                    component="nav">
                    <ListItemButton onClick={() => this.handleOPenList()}>
                        <ListItemText primary="Databases" />
                        {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            {this.state.databases && this.state.databases.map((e, i) => (
                                <Box key={i} >
                                    <ListItemButton sx={{ pl: 4 }} onClick={() => this.getCollections(e)}>
                                        <ListItemText primary={e} />
                                        {this.state.openCollections === e ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={this.state.openCollections === e} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                                {this.state.collections && this.state.collections.map((ee, i) => (
                                                    <ListItemButton key={i} sx={{ pl: 8 }} onClick={() => console.log(e, ee)}>
                                                        <ListItemText  primary={ee} />
                                                    </ListItemButton>
                                                ))}
                                        </List>
                                    </Collapse>
                                </Box>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </>
        );
    }
}