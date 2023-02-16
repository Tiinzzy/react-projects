import React from "react";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grow from '@mui/material/Grow';

import { Base64 } from 'js-base64';
import { LISTENERS } from './messaging';

import BackEndConnection from './BackEndConnection';
import GraphTree from "./GraphTree";

import './style.css';

const backend = BackEndConnection.INSTANCE();

const UPDATE_DATA_INTERVAL = 1000;
const URL_UPDATE_INTERVAL = 1000;

let mountCount = 0;

class EnterDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.foxnews.com/',
            depth: 2,
            searchNum: 2,
            logs: [],
            urls: [],
            buttonOff: false,
            grow: false,
            showButton: false,
        }
    }

    componentDidMount() {
        if (mountCount > 0) {
            let that = this;
            setInterval(() => {
                let urls = that.state.urls;
                let logs = that.state.logs;
                const event = new CustomEvent('sending-data-for-tree', {
                    detail: { data: urls }
                });
                LISTENERS.getTreeData().dispatchEvent(event);
                if (logs.length < urls.length) {
                    logs.push(urls[logs.length]);
                    if (logs.length === urls.length) {
                        that.setState({ buttonOff: false, showButton: true });
                    }
                }
                that.setState({ grow: true, logs }, () => {
                    let logsDiv = document.getElementById("logs_container");
                    logsDiv.scrollTop = logsDiv.scrollHeight;
                });

            }, URL_UPDATE_INTERVAL);
            return;
        }
        mountCount += 1;

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
        let that = this;
        this.setState({ buttonOff: true, logs: [], urls: [] }, () => {
            let url = Base64.encode(that.state.url);

            backend.trigger_crawling(url, that.state.depth, that.state.searchNum, (data) => {
                console.log(data);
            });

            let interval = setInterval(() => {
                backend.get_crawling_result((data) => {
                    that.setState({ urls: data.urls });
                    console.log(data.urls);
                    if (data.finished === true) {
                        clearInterval(interval);
                        return;
                    };
                });

            }, UPDATE_DATA_INTERVAL);
        });

    }

    clearTheResult() {
        window.location = "./"
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

                <Box className="ButtonBoxSubmit">
                    <Button id="submit_btn" variant="contained" onClick={() => this.sendDataToBackend()} disabled={this.state.buttonOff}>Submit</Button>
                </Box>

                <Box id="logs_container">
                    {this.state.logs.map((l, i) => (
                        <div className="UrlDataDive" key={i}>
                            <span id="url_num">{i + 1}: </span>
                            <Grow in={this.state.grow}
                                style={{ transformOrigin: '0 0 0' }}
                                {...(this.state.grow ? { timeout: 2000 } : {})}>
                                <span className="UrlData">{l.url.substring(0, 100)}</span>

                            </Grow>
                        </div>
                    ))}
                </Box>
                {this.state.showButton === true &&
                    <Box className="ButtonBoxClear">
                        <Button id="clear_btn" variant="contained" onClick={() => this.clearTheResult()}>clear</Button>
                    </Box>}

                <Box marginTop={20}>
                    <GraphTree />
                </Box>
            </Box>
        );
    }
}
export default EnterDetails;