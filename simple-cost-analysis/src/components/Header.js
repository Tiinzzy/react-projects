import React from "react";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import FilePicker from './FilePicker'

import { getData, saveCsv } from './functions';

const headerStyle = {
    cursor: 'pointer',
    color: '#1c4966'
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleSave = this.handleSave.bind(this);
    }

    async handleSave() {
        let data = await getData();
        await saveCsv(data);
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                    <Link href="/" style={headerStyle}>Home</Link>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <FilePicker />
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <Link href="/display-grid" style={headerStyle}>Show Data</Link>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 2, mr: 2 }} />
                    <Link onClick={() => this.handleSave()} style={headerStyle}>Save File</Link>
                </Box>

            </>
        );
    }
}
export default Header;