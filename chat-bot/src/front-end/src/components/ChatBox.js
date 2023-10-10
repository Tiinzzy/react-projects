import React from "react";

import { Box, Paper, TextField, Button, Typography, Divider } from '@mui/material';

import BackEndConnection from './BackEndConnection';

const backend = BackEndConnection.INSTANCE();

const containerStyle = {
    width: '400px',
    padding: '16px',
    margin: '20px auto',
};

const inputFieldStyle = {
    width: '100%',
    marginBottom: '16px',
    marginTop: '16px'
};

const messageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: 'solid 1px #eaeaea',
    padding: '15px'
};

const messageStyle = {
    padding: '8px',
    borderRadius: '5px',
    marginBottom: '8px',
    maxWidth: '70%',
};

const userMessageStyle = {
    ...messageStyle,
    backgroundColor: '#e1e1e1',
    alignSelf: 'flex-end',
};

const chatbotMessageStyle = {
    ...messageStyle,
    backgroundColor: '#4caf50',
    color: 'white',
    alignSelf: 'flex-start',
};

const header = {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center'
}

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
        };
    }

    handleInputChange = (e) => {
        this.setState({ newMessage: e.target.value });
    };

    submitUserMessage = () => {
        if (this.state.newMessage.trim() !== '') {
            let query = { 'user_message': this.state.newMessage.trim() }
            backend.send_chatbot_question(query, (data) => {
                console.log(data);
                const chatbotResponse = { text: data.result, isUser: false };
                setTimeout(() => {
                    const updatedMessages = [...this.state.messages, chatbotResponse];
                    this.setState({ messages: updatedMessages });
                }, 1000);
            })
            const updatedMessages = [...this.state.messages, { text: this.state.newMessage, isUser: true }];
            this.setState({ messages: updatedMessages, newMessage: '' });
        }
    };

    render() {
        return (
            <>
                <Box >
                    <Typography variant="h6" style={header}>Chat Box</Typography>
                    <Paper style={containerStyle}>
                        <div style={messageContainerStyle}>
                            {this.state.messages.map((e, i) => (
                                <div key={i} style={e.isUser ? userMessageStyle : chatbotMessageStyle}>
                                    {e.text}
                                </div>
                            ))}
                        </div>
                        <Divider style={{ marginTop: '16px' }} />
                        <TextField
                            style={inputFieldStyle}
                            label="Type a message"
                            variant="outlined"
                            value={this.state.newMessage}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                        <Button size="small" variant="contained" color="primary" onClick={() => this.submitUserMessage()}>
                            Submit
                        </Button>
                    </Paper>
                </Box>
            </>
        );
    }
}
export default ChatBox;