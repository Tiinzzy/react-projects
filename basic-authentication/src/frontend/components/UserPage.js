import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import BackEndConnection from './BackEndConnection';
import LoginForm from "./LoginForm";

import './style.css'

const backend = BackEndConnection.INSTANCE();

export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            userLoggedOut: false
        }
    }

    componentDidMount() {
        // backend.checkLoginStatus((data) => {
        //     console.log('login status: ', data);
        // })
    }

    getSecret() {
        backend.callSecrete((data) => {
            console.log(data);
        })
    }

    logOutUser() {
        let that = this;
        backend.logout_user((data) => {
            that.setState({ logout: data.authorized })
        })

        backend.checkLoginStatus((data) => {
            that.setState({ currentStatus: data.authorized });
        })

        if (that.state.currentStatus === that.state.logout) {
            that.setState({ userLoggedOut: true })
        }
    }

    render() {
        return (
            <>
                {this.state.userLoggedOut === true && <LoginForm />}

                {this.state.userLoggedOut === false &&
                    <Box style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography mb={2} className="LoginHeader" variant="body1">
                            Hi <span style={{ fontWeight: 'bold' }}>{this.state.username}</span>, welcome back!
                        </Typography>
                        <Button style={{ marginBottom: 10 }} className="LoginBtn" variant="contained" onClick={() => this.getSecret()}>SECRET!</Button>
                        <Button className="LoginBtn" variant="contained" onClick={() => this.logOutUser()}>Logout</Button>
                    </Box>}
            </>
        );
    }
};