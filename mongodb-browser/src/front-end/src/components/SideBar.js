import React from "react";

import List from '@mui/material/List';
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
            openList: false
        }
    }

    componentDidMount() {
        backend.get_databases_mongo_db(this.state.connectionInfo, (data) => {
            let that = this;
            that.setState({databases: data.available_databases});
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
                            {this.state.databases && this.state.databases.map((e, i) => (
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