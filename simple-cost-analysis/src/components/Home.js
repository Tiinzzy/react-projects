import React from "react";

import Box from '@mui/material/Box';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                   This will be home
                </Box>

            </>
        );
    }
}
export default Home;