import React from "react";

import Box from '@mui/material/Box';

import './style.css';

const HELP = [
    "First go to Upload File",
    "Select a file to uploead using the button",
    "The file must be CSV to be read",
    "When your file is uploaded, you will see a display of it",
    "There is also a display of any pervious data if it existed from before",
    "If youre satisfied with your file click on save button",
    "Once the pop-up comes up, you will be notified that saving new file will remove any previous data",
    "AFter saving the file new data will be available and you can see them in Show Data"
];

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Box className="HomeBox">
                <ol>
                    {HELP.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))}
                </ol>
            </Box>
        );
    }
}
export default Home;