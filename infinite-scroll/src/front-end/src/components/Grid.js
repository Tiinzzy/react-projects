import React from "react";

import LinearProgress from '@mui/material/LinearProgress';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import BackEndConnection from './BackEndConnection';
import ScrollBar from "./ScrollBar";
import DisplayTable from "./DisplayTable";

import '../App.css';
import './style.css';

const backend = BackEndConnection.INSTANCE();

const DEFAULT_ROW_PER_PAGE = 100;
const BUTTONS_HEIGHT = 2 * 22;

function getWindowSize() {
    return { h: window.innerHeight - 80, w: window.innerWidth }
}

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: null,
            dataDisplay: [],
            pageNum: 0,
            busy: false,
            showProgress: false,
            windowSize: getWindowSize(),
            totalPageCount: -1,
            rowPerPage: DEFAULT_ROW_PER_PAGE,
            callBack: props.callBack
        }
        this.handleResize = this.handleResize.bind(this);
        this.jumpToPage = this.jumpToPage.bind(this);
    }

    componentDidMount() {
        backend.get_data_length((data) => {
            this.setState({ totalPageCount: Math.floor(data.data_length / this.state.rowPerPage) }, function () {
                this.jumpToPage(0);
            });
        });

        document.getElementById('scorll-element').addEventListener('wheel', (e) => this.handelScroll(e));
        window.addEventListener('resize', this.handleResize);
    }


    jumpToPage(newPage) {
        let query = { offset_number: newPage * this.state.rowPerPage, display_number: this.state.rowPerPage };
        let totalPageCount = this.state.totalPageCount;
        this.setState({ showProgress: true }, () => {
            backend.get_all_movies(query, (data) => {
                let headers = Object.keys(data[0]).filter(h => h !== 'row_number');
                headers.unshift('Id');
                this.setState({ totalPageCount: -1 }, function () {
                    this.setState({ showProgress: false, totalPageCount, dataDisplay: data, pageNum: newPage, headers }, () => {
                        this.state.callBack(this.state.pageNum);
                    });
                });
            });
        });
    }

    handleResize() {
        let windowSize = getWindowSize();
        this.setState({ windowSize });

        console.log(this.state.windowSize.h - 55);
    }

    handelScroll(e) {
        if (e.target.id === 'page-scroll') {
            this.setState({ showProgress: true }, () => {
                let movingDown = e.deltaY > 0;
                if (movingDown && !this.state.busy) {
                    this.setState({ busy: true }, function () {
                        let pageNum = this.state.pageNum + 1;
                        pageNum = pageNum < this.state.totalPageCount ? pageNum : this.state.totalPageCount;
                        let query = { offset_number: pageNum * this.state.rowPerPage, display_number: this.state.rowPerPage };
                        backend.get_all_movies(query, (data) => {
                            this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false }, () => {
                                this.state.callBack(this.state.pageNum);
                            });
                        });
                    });
                } else if (!movingDown && !this.state.busy) {
                    this.setState({ busy: true }, () => {
                        let pageNum = this.state.pageNum - 1;
                        pageNum = pageNum > 0 ? pageNum : 0;
                        let query = { offset_number: pageNum * this.state.rowPerPage, display_number: this.state.rowPerPage };
                        backend.get_all_movies(query, (data) => {
                            this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false }, () => {
                                this.state.callBack(this.state.pageNum);
                            });
                        });
                    });
                }
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    handleGoingUpDown(e) {
        if (e === 'up') {
            this.setState({ showProgress: true }, () => {
                this.setState({ busy: true }, () => {
                    let query = { offset_number: 0 * this.state.rowPerPage, display_number: this.state.rowPerPage };
                    backend.get_all_movies(query, (data) => {
                        this.setState({ busy: false, dataDisplay: data, showProgress: false, pageNum: 0 }, () => {
                            this.state.callBack(this.state.pageNum);
                        });
                    });
                });
            })
        } else if (e === 'down') {
            this.setState({ showProgress: true }, () => {
                this.setState({ busy: true }, () => {
                    let query = { offset_number: this.state.totalPageCount * this.state.rowPerPage, display_number: this.state.rowPerPage };
                    backend.get_all_movies(query, (data) => {
                        this.setState({ busy: false, dataDisplay: data, showProgress: false, pageNum: this.state.totalPageCount }, () => {
                            this.state.callBack(this.state.pageNum);
                        });
                    });
                });
            })
        }
    }

    render() {
        return (
            <>
                {this.state.showProgress ? <LinearProgress color="primary" /> : <div style={{ height: 4 }}></div>}

                <div id='scorll-element' style={{ display: 'flex' }}>

                    <div className='tabel-container' style={{ height: this.state.windowSize.h }}>
                        {this.state.headers && this.state.dataDisplay &&
                            <DisplayTable headers={this.state.headers} dataDisplay={this.state.dataDisplay} />}
                    </div>

                    <div id="scroll+buttons+container" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div id="top-scroll" className="btn-styling" onClick={() => this.handleGoingUpDown('up')}>
                            <FontAwesomeIcon icon={faAngleUp} style={{ fontSize: 12, fontWeight: 'bold' }} />
                        </div>
                        {this.state.totalPageCount >= 0 &&
                            <ScrollBar buttonHeight={BUTTONS_HEIGHT} height={this.state.windowSize.h - BUTTONS_HEIGHT} currentPage={this.state.pageNum} totalPages={this.state.totalPageCount} callParent={this.jumpToPage} />}
                        <div id="buttom-scroll" className="btn-styling" onClick={() => this.handleGoingUpDown('down')}>
                            <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: 12, fontWeight: 'bold' }} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}