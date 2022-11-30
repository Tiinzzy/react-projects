import React from "react";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import FilePicker from './FilePicker';

import './design.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box className="HeaderBox">
                <Link href="/home">Home</Link>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                <FilePicker />
            </Box>
        );
    }
}
export default Header;