import React from "react";

import { Typography, Button, Box } from "@mui/material";

import ChatBox from "./ChatBox";
import ImageDetection from "./ImageDetection";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1
        }
    }

    switchPage(pageNum) {
        if (pageNum === 1) {
            this.setState({ pageNumber: 1 });
        } else if (pageNum === 2) {
            this.setState({ pageNumber: 2 });
        }
    }

    render() {
        return (
            <>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', padding: 10, borderBottom: 'solid 2px #41424C', backgroundColor: '#009688', marginBottom: 40 }}>
                    <Typography variant="body1" fontWeight="bold" color="#FFB800" style={{ marginLeft: 20 }}>HuggingFace</Typography>
                    <Button variant="text" style={{ color: 'white', marginLeft: 15, backgroundColor: this.state.pageNumber === 1 && '#EFF8FF33' }} size="small" onClick={() => this.switchPage(1)}>ChatBot</Button>
                    <Button variant="text" style={{ marginRight: 15, marginLeft: 15, color: 'white', backgroundColor: this.state.pageNumber === 2 && '#EFF8FF33' }} size="small" onClick={() => this.switchPage(2)}>Image Detection</Button>
                </Box>
                {this.state.pageNumber === 1 ? <ChatBox /> : <ImageDetection />}
            </>
        );
    }
}