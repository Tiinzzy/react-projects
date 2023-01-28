import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import BackEndConnection from "./BackendConnection";
import { Base64 } from 'js-base64';

const backend = BackEndConnection.INSTANCE();

class TinyUrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showResult: false,
            assignedValue: '',
            typpedUrl: '',
            error: null
        }
        this.convertToTiny = this.convertToTiny.bind(this);
        this.getLongUrl = this.getLongUrl.bind(this);
        this.resetConvert = this.resetConvert.bind(this);
        this.copyUrl = this.copyUrl.bind(this);
    }

    getLongUrl(e) {
        this.setState({ typpedUrl: e.target.value, error: null });
    }

    convertToTiny() {
        const RANDOM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const RANDOM_LENGTH = RANDOM.length;
        let randomAssignment = ' ';
        for (let i = 0; i < 10; i++) {
            randomAssignment += RANDOM.charAt(Math.floor(Math.random() * RANDOM_LENGTH));
        }
        if (this.state.typpedUrl.trim() === '') {
            this.setState({ error: 'Please Provide a Valid URL' });
        } else {
            this.setState({ showResult: true }, () => {
                let that = this;
                let urlEncode = Base64.encode(this.state.typpedUrl);
                console.log('En -->', urlEncode);
                backend.get_tiny_url(urlEncode, 'http://localhost:3000/' + randomAssignment.trim(), (data) => {
                    that.setState({ assignedValue: data[0].tiny_url })
                })
            });
        }
    }

    resetConvert() {
        this.setState({ showResult: false, typpedUrl: '' })
    }

    copyUrl() {
        let copyText = document.getElementById('tiny-url-result');
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Box style={{ display: 'flex', flexDirection: 'column', border: 'solid 3px #73a5f5', borderRadius: 5, padding: 20, width: 500 }}>
                    <Box style={{ display: 'flex', flexDirection: 'row' }}>
                        <InsertLinkIcon />
                        {this.state.showResult === false ? <Typography ml={2} mb={2}>Enter a long URL to make it tiny</Typography>
                            : <Typography ml={2} mb={2}>Your long URL</Typography>}
                    </Box>

                    <TextField
                        variant="outlined"
                        size="small"
                        error={this.state.error !== null}
                        label={this.state.error}
                        InputLabelProps={{ shrink: true, }}
                        onChange={(e) => this.getLongUrl(e)}
                        value={this.state.typpedUrl} />



                    {this.state.showResult === false &&
                        <Button variant="contained" style={{ marginTop: 20 }} onClick={() => this.convertToTiny()}>Make Tiny URL</Button>}
                    {this.state.showResult === true &&
                        <Box style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}> <AutoFixHighIcon /> <Typography ml={2} mb={2}>Your Tiny URL</Typography></Box>}
                    {this.state.showResult === true &&
                        <TextField variant="outlined" size="small" value={this.state.assignedValue} id="tiny-url-result" />}
                    {this.state.showResult === true &&
                        <Box style={{ border: 'solid 0px red', padding: '10px 10px 10px 0', marginTop: 10, display: 'flex', justifyContent: 'left' }}>
                            <a id="redirect-btn" variant="contained"
                                style={{
                                    marginRight: 10, cursor: 'pointer', textDecoration: 'none',
                                    border: 'solid 1px #1769aa', borderRadius: 4.5, backgroundColor: '#1769aa', color: 'white',
                                    padding: '8px 12px 8px 12px'
                                }}
                                target="_blank" href={this.state.assignedValue}>
                                REDIRECT
                            </a>
                            <Button variant="contained" style={{ marginRight: 10 }} onClick={() => this.copyUrl()}>Copy</Button>
                            <Button variant="contained" style={{}} onClick={() => this.resetConvert()}>Reset</Button>
                        </Box>}
                </Box>
            </Box>
        );
    }
}
export default TinyUrl;