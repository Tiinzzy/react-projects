import React from "react";

import Box from '@mui/material/Box';

import { eventEmitter } from './DisplayList';

class DisplayEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        eventEmitter.on('selectedItem', (data) => {
            console.log(data.item)
        });
    }

    componentWillUnmount() {
        eventEmitter.off('selectedItem');
    }

    render() {
        return (
            <Box style={{ border: 'solid 1px #eaeaea', marginLeft: 40, width: '90%', borderRadius: 6 }}>
                this is edit page
            </Box>
        );
    }
}
export default DisplayEdit;