import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    getEmail(e) {
        this.setState({ email: e.target.value })
    }


    render() {
        return (
            <Box className="WholePageBox">
                <Box className="ForgotPasswordBox">
                    <Typography variant="body1" className="ForgotPassHeader">Forgot Password</Typography>
                    <TextField style={{ marginTop: 15 }} label="Username or Email" variant="outlined" onChange={(e) => this.getEmail(e)} />
                </Box>
            </Box>
        );
    }
};


/*

USERS_TABLE
--------------------
user_name,
email,
passowrd_md5,
reset_password_id,
asked_for_reset_date

*/