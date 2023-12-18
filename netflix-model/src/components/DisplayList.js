import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dialog from '@mui/material/Dialog';

import EventEmitter from 'eventemitter3';

import AddGenreDialog from "./add/AddGenreDialog";
import AddCustomerDialog from "./add/AddCustomerDialog";
import AddMoviesDialog from './add/AddMoviesDialog';
import AddSubscriptionDialog from './add/AddSubscriptionDialog';
import AddTvSeriesDialog from './add/AddTvSeriesDialog';

export const eventEmitter = new EventEmitter();
export const eventUpdateEmitter = new EventEmitter();

const NETFLIX_MODEL = ["Customer", "Genre", "Movies", "Subscription", "TV Series", "Directory Depth Search", "Game of Life", "Gravity", "Langtons Ant"];

class DisplayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: '',
            addClick: '',
            openDialog: false,
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleClick(index, item) {
        this.setState({ selectedIndex: index, selectedItem: item }, () => {
            eventEmitter.emit('selectedItem', { item: this.state.selectedItem });
        });
    }

    addClicked(e) {
        this.setState({ addClick: e, openDialog: true, readyData: e });
    }

    handleCloseDialog(e) {
        if (e) {
            this.setState({ openDialog: false, addClick: '' }, () => {
                if (e === 'reload movie') {
                    eventUpdateEmitter.emit('reloadList', { for: 'movie' });
                } else if (e === 'reload customer') {
                    eventUpdateEmitter.emit('reloadList', { for: 'customer' });
                } else if (e === 'reload genre') {
                    eventUpdateEmitter.emit('reloadList', { for: 'genre' });
                } else if (e === 'reload subscription') {
                    eventUpdateEmitter.emit('reloadList', { for: 'subsription' });
                } else if (e === 'reload tvseries') {
                    eventUpdateEmitter.emit('reloadList', { for: 'tvseries' });
                }
            });
        } else {
            this.setState({ openDialog: false, addClick: '' });
        }
    }

    render() {
        return (
            <Box sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper', border: 'solid 1px #eaeaea', borderRadius: 1.5, height: 450 }}>
                <nav aria-label="main mailbox folders">
                    <List >
                        {NETFLIX_MODEL.map((e, i) => (
                            <ListItem disablePadding key={i} onClick={() => this.handleClick(i, e)} style={{ backgroundColor: this.state.selectedIndex === i ? "#f0f0f0" : "transparent" }}>
                                <ListItemButton>
                                    <ListItemText primary={e} />
                                    <Box display="flex" flexGrow={1} />
                                    {e !== "Directory Depth Search" && e !== "Game of Life" && e !== "Gravity" && e !== "Langtons Ant" && <AddBoxIcon onClick={() => this.addClicked(e)} style={{ color: this.state.addClick === e ? '#08A045' : 'black' }} />}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>
                <Dialog open={this.state.openDialog} onClose={() => this.handleCloseDialog()} maxWidth="lg">
                    {this.state.addClick === "Genre" && <AddGenreDialog addClick={this.state.addClick} handleClose={this.handleCloseDialog} />}
                    {this.state.addClick === "Customer" && <AddCustomerDialog addClick={this.state.addClick} handleClose={this.handleCloseDialog} />}
                    {this.state.addClick === "Movies" && <AddMoviesDialog addClick={this.state.addClick} handleClose={this.handleCloseDialog} />}
                    {this.state.addClick === "Subscription" && <AddSubscriptionDialog addClick={this.state.addClick} handleClose={this.handleCloseDialog} />}
                    {this.state.addClick === "TV Series" && <AddTvSeriesDialog addClick={this.state.addClick} handleClose={this.handleCloseDialog} />}
                </Dialog>
            </Box>
        );
    }
}
export default DisplayList;
