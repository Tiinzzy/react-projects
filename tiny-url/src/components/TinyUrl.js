import React from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
        this.redirectToUrl = this.redirectToUrl.bind(this);
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
                backend.get_tiny_url(urlEncode, (data) => {
                    that.setState({ assignedValue: 'http://localhost:3000/' + data })
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

    redirectToUrl() {
        window.open(this.state.assignedValue, '_blank');
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
                            <Button variant="contained" style={{ marginRight: 10 }} onClick={() => this.redirectToUrl()}
                                startIcon={<ShortcutIcon />}>Redirect</Button>
                            <Button variant="contained" style={{ marginRight: 10 }} onClick={() => this.copyUrl()}
                                startIcon={<ContentCopyIcon />}>Copy</Button>
                            <Button variant="contained" onClick={() => this.resetConvert()}>Reset</Button>
                        </Box>}
                </Box>
            </Box>
        );
    }
}
export default TinyUrl;