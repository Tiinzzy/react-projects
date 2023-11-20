import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const NETFLIX_MODEL = ["Customer", "Genre", "Movies", "Subscription", "TV Series"];

class DisplayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper', border: 'solid 1px #eaeaea', borderRadius: 1.5 }}>
                <nav aria-label="main mailbox folders">
                    <List >
                        {NETFLIX_MODEL.map((e, i) => (
                            <ListItem disablePadding key={i}>
                                <ListItemButton>
                                    <ListItemText primary={e} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </nav>
            </Box>
        );
    }
}
export default DisplayList;
