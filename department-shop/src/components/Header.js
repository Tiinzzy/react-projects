import React from "react";

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const headerStyle = {
    cursor: 'pointer',
    color: '#1c4966'
}

class DropDownMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <>
                <Box display='flex' mb={4} mt={1} ml={1}>
                    <Link href="/" style={headerStyle}>Home</Link>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <Link href="/add-order" style={headerStyle}>Add Order</Link>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <Link href="/list-orders" style={headerStyle}>Orders List</Link>
                </Box>

            </>
        );
    }
}
export default DropDownMenu;