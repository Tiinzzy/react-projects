import React from "react";

import Box from '@mui/material/Box';

import './style.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <>
                <Box className="HomeBox">
                    <p>1.First go to Upload File</p>
                    <p>2.Select a file to uploead using the button</p>
                    <p>2.a. THe file must be CSV to be read</p>
                    <p>3.When your file is uploaded, you will see a display of it</p>
                    <p>4.There is also a display of any pervious data if it existed from before</p>
                    <p>5.If youre satisfied with your file click on save button</p>
                    <p>6.Once the pop-up comes up, you will be notified that saving new file will remove any previous data</p>
                    <p>7.AFter saving the file new data will be available and you can see them in Show Data</p>
                </Box>

            </>
        );
    }
}
export default Home;