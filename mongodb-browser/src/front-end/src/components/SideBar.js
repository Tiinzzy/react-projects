import React from "react";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import './style.css';
import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

const data = [1, 2, 3, 4, 5, 6, 7];

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionInfo: props.connectionInfo,
            openList: false
        }
    }

    componentDidMount() {
        console.log(this.state.connectionInfo);
        backend.get_databases_mongo_db((data) => {
            console.log(data);
        })
    }

    handleOPenList() {
        this.setState({ openList: !this.state.openList });
    }


    render() {
        return (
            <>
                <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}
                    component="nav">
                    <ListItemButton onClick={() => this.handleOPenList()}>
                        <ListItemText primary="Databases" />
                        {this.state.openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            {data.map((e, i) => (
                                <ListItemButton sx={{ pl: 4 }} key={i} onClick={() => this.sendSqlCommand(e)}>
                                    <ListItemText primary={e} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>

            </>
        );
    }
}