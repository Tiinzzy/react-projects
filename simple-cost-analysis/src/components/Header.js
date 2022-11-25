import React from "react";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

const headerStyle = {
    cursor: 'pointer',
    color: '#1c4966'
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        // this.handleSave = this.handleSave.bind(this);
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                    <Link href="/" style={headerStyle}>Home</Link>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <Link href="/upload-save-file" style={headerStyle}> Upload File</Link>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <Link href="/display-grid" style={headerStyle}>Show Data</Link>
                </Box>
                <Divider flexItem sx={{ borderRightWidth: 5 }} color="#1c4966"/>

            </>
        );
    }
}
export default Header;