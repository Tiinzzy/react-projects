import React from "react";

import { Box, Paper, TextField, Button, Typography, Divider } from '@mui/material';

import BackEndConnection from './BackEndConnection';
import LoadingDots from './LoadingDots';

const backend = BackEndConnection.INSTANCE();

const containerStyle = {
    width: '600px',
    padding: '16px',
    margin: '20px auto',
};

const inputFieldStyle = {
    width: '100%',
    marginBottom: '16px',
    marginTop: '16px'
};

const messageContainerStyle = {
    display: "flex",
    flexDirection: "column",
    border: "solid 1px #eaeaea",
    padding: "15px",
    maxHeight: "360px",
    height: '360px',
    overflowY: "auto",
};

const messageStyle = {
    padding: '8px',
    borderRadius: '5px',
    marginBottom: '8px',
    maxWidth: '70%',
};

const userMessageStyle = {
    ...messageStyle,
    backgroundColor: '#2196f3',
    color: 'white',
    alignSelf: 'flex-end',
};

const chatbotMessageStyle = {
    ...messageStyle,
    backgroundColor: '#e0e0e0',
    color: 'black',
    alignSelf: 'flex-start',
};

const messageContainerWrapperStyle = {
    height: '400px',
    maxHeight: '400px',
    overflowY: 'auto',
};

const headerStyle = {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    color: '#000000',
    background: '#FFFFFF',
    textShadow: '1px 1px 0 #bcbcbc, 2px 2px 0 #9c9c9c',
    fontWeight: 'bold'
}

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
            loading: false
        };
    }

    handleInputChange = (e) => {
        this.setState({ newMessage: e.target.value });

        if (e.keyCode === 13) {
            e.preventDefault();
        }
        let key = e.code || "";
        let isEnter = key.toLowerCase().indexOf('enter') >= 0;
        if (isEnter) {
            this.submitUserMessage();
        }
    };

    goBottom = () => {
        let div = document.getElementById("chat-box-container");
        div.scrollTop = div.scrollHeight;
    }

    submitUserMessage = () => {
        if (this.state.newMessage.trim() !== '') {
            let query = { 'user_message': this.state.newMessage.trim().replace("'", "") }
            backend.send_chatbot_question(query, (data) => {
                if (data) {
                    const chatbotResponse = { text: data.result, isUser: false };
                    this.setState({ loading: true });
                    setTimeout(() => {
                        const updatedMessages = [...this.state.messages, chatbotResponse];
                        this.setState({ messages: updatedMessages, loading: false }, this.goBottom);
                    }, 1000);
                };

            })
            const updatedMessages = [...this.state.messages, { text: this.state.newMessage, isUser: true }];
            this.setState({ messages: updatedMessages, newMessage: '' }, this.goBottom);
        }
    };

    render() {
        return (
            <Box>
                <Typography variant="h6" style={headerStyle}>
                    Chat Box
                </Typography>
                <Paper style={containerStyle}>
                    <Box style={messageContainerWrapperStyle}>
                        <Box id='chat-box-container' style={messageContainerStyle}>
                            {this.state.messages.map((e, i) => (
                                <Box key={i} style={e.isUser ? userMessageStyle : chatbotMessageStyle}>
                                    {e.text}
                                </Box>
                            ))}
                            {this.state.loading && <LoadingDots />}
                        </Box>
                    </Box>
                    <Divider style={{ marginTop: '16px' }} />
                    <TextField
                        autoFocus
                        style={inputFieldStyle}
                        label="Type a message"
                        variant="outlined"
                        value={this.state.newMessage}
                        onChange={(e) => this.handleInputChange(e)}
                        onKeyDown={(e) => this.handleInputChange(e)} />
                    <Button size="small" variant="contained" color="primary" onClick={() => this.submitUserMessage()}>
                        Submit
                    </Button>
                </Paper>
            </Box>
        );
    }
};