import React from "react";

import DisplayList from "./DisplayList";
import DisplayEdit from "./DisplayEdit";

import Box from '@mui/material/Box';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box style={{ paddingTop: 50, paddingRight: 10, paddingLeft: 10, paddingBottom: 50, display: 'flex', flexDirection: 'row' }}>
                <DisplayList />
                <DisplayEdit />
            </Box>
        );
    }
}
export default Home;