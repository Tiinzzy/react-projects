import React from "react";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import './design.css';

const headerStyle = {
    cursor: 'pointer',
    color: '#1c4966',
    TextDecoder: 'none'
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Box className="HeaderBox">
                    <Link href="/home" style={headerStyle}>Home</Link>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <Link href="/upload-save-display-file" style={headerStyle}> Upload</Link>
                </Box>
                <Divider flexItem sx={{ borderRightWidth: 5 }} color="#1c4966" />
            </>
        );
    }
}
export default Header;