import React from "react";

import Box from '@mui/material/Box';

import './style.css';

export default class DocumentsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            database: props.database,
            collection: props.collection
        }
        console.log(props.database, props.collection)
    }


    render() {
        return (
            <Box>
                this will be documents display content
            </Box>
        );
    }
}