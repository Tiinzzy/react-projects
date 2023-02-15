import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import { Base64 } from 'js-base64';

import BackEndConnection from './BackEndConnection';

import './style.css';

const backend = BackEndConnection.INSTANCE();

const UPDATE_DATA_INTERVAL = 1000;
const URL_UPDATE_INTERVAL = 1000;

let mountCount = 0;

class EnterDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.bbc.com',
            depth: 3,
            searchNum: 3,
            index: 0,
            logs: [],
            urls: [],
            buttonOff: false
        }
    }

    componentDidMount() {
        if (mountCount > 0) {
            return;
        }
        mountCount += 1;

        let that = this;
        setInterval(() => {
            let urls = that.state.urls;
            let logs = that.state.logs;
            if (logs.length < urls.length) {
                logs.push(urls[logs.length]);
            }
            that.setState({ logs }, () => {
                let logsDiv = document.getElementById("logs_container");
                logsDiv.scrollTop = logsDiv.scrollHeight;
            });

        }, URL_UPDATE_INTERVAL);
    }

    setUrl(e) {
        this.setState({ url: e.target.value });
    }

    setDepth(e) {
        this.setState({ depth: e.target.value });
    }

    setSearch(e) {
        this.setState({ searchNum: e.target.value });
    }

    sendDataToBackend() {
        this.setState({ buttonOff: true });
        let url = Base64.encode(this.state.url);
        backend.trigger_crawling(url, this.state.depth, this.state.searchNum, (data) => {
            console.log(data);
        });

        let interval = setInterval(() => {
            backend.get_crawling_result((data) => {
                let that = this;
                that.setState({ urls: data.urls });
                console.log(that.state.urls)
                if (data.finished === true) {
                    that.setState({ buttonOff: false });
                    clearInterval(interval);
                    return;
                }
            });

        }, UPDATE_DATA_INTERVAL);
    }

    render() {
        return (
            <Box className="MainBox">
                <Typography mb={0.5} variant="body1">Enter URL</Typography>
                <TextField size="small" variant="outlined" value={this.state.url} style={{ marginBottom: 25 }} onChange={(e) => this.setUrl(e)} />

                <Typography mb={0.5} variant="body1">Depth of Search</Typography>
                <TextField size="small" variant="outlined" value={this.state.depth} style={{ marginBottom: 25 }} onChange={(e) => this.setDepth(e)} />

                <Typography mb={0.5} variant="body1">Number of Search</Typography>
                <TextField size="small" variant="outlined" value={this.state.searchNum} style={{ marginBottom: 25 }} onChange={(e) => this.setSearch(e)} />

                <Box className="ButtonBox">
                    <Button id="submit_btn" variant="contained" onClick={() => this.sendDataToBackend()} disabled={this.state.buttonOff}>Submit</Button>
                </Box>

                <Box id="logs_container">
                    {this.state.logs.map((l, i) => (
                        <div className="UrlDataDive" key={i}>{i + 1}:
                            <span className="UrlData">{l.url.substring(0, 100)}</span>
                        </div>
                    ))}
                </Box>
            </Box>
        );
    }
}
export default EnterDetails;