import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import EnterDetails from './EnterDetails';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                <Typography variant="h4" fontSize={20} fontWeight="bold">Web Crawler</Typography>
                <EnterDetails />
            </Box>
        );
    }
}
export default MainPage;