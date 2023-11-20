import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dialog from '@mui/material/Dialog';

import EventEmitter from 'eventemitter3';

import AddDialog from "./AddDialog";

export const eventEmitter = new EventEmitter();
const NETFLIX_MODEL = ["Customer", "Genre", "Movie", "Subscription", "TV Series"];

class DisplayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: '',
            addClick: '',
            openDialog: false
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleClick(index, item) {
        this.setState({ selectedIndex: index, selectedItem: item }, () => {
            eventEmitter.emit('selectedItem', { item: this.state.selectedItem });
        });
    }

    addClicked(e) {
        this.setState({ addClick: e, openDialog: true })
    }

    handleCloseDialog() {
        this.setState({ openDialog: false, addClick: '' })
    }

    render() {
        return (
            <Box sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper', border: 'solid 1px #eaeaea', borderRadius: 1.5 }}>
                <nav aria-label="main mailbox folders">
                    <List >
                        {NETFLIX_MODEL.map((e, i) => (
                            <ListItem disablePadding key={i} onClick={() => this.handleClick(i, e)} style={{ backgroundColor: this.state.selectedIndex === i ? "#f0f0f0" : "transparent" }}>
                                <ListItemButton>
                                    <ListItemText primary={e} />
                                    <Box display="flex" flexGrow={1} />
                                    <AddBoxIcon onClick={() => this.addClicked(e)} style={{ color: this.state.addClick === e ? '#08A045' : 'black' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>
                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()}>
                    <AddDialog addClick={this.state.addClick} handleClose={this.handleCloseDialog}/>
                </Dialog>
            </Box>
        );
    }
}
export default DisplayList;
