import React from "react";

import Box from '@mui/material/Box';


const headerStyle = {
    cursor: 'pointer',
    color: '#1c4966'
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <>
                <Box display='flex' justifyContent="center">
                    Application for getting orders, display orders, like a shop with backend and grid practice!
                    
                </Box>

            </>
        );
    }
}
export default Home;