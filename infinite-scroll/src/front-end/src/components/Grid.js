import React from "react";

import LinearProgress from '@mui/material/LinearProgress';

import BackEndConnection from './BackEndConnection';
import ScrollBar from "./ScrollBar";

import '../App.css';
import './style.css';

const backend = BackEndConnection.INSTANCE();

const DEFAULT_ROW_PER_PAGE = 100;

function getWindowSize() {
    return { h: window.innerHeight - 50, w: window.innerWidth }
}

function TableRow({ i, e }) {
    return (
        <tr key={i}>
            <td >{e.row_number}</td>
            <td >{e.genres}</td>
            <td >{e.imdb}</td>
            <td >{e.movie_id}</td>
            <td >{e.overview.substr(0, 150) + '...'}</td>
            <td >{e.title}</td>
            <td >{e.vote}</td>
            <td >{e.vote_count}</td>
        </tr>
    )
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
            rowPerPage: DEFAULT_ROW_PER_PAGE
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
                    this.setState({ showProgress: false, totalPageCount, dataDisplay: data, pageNum: newPage, headers });
                });
            });
        });
    }

    handleResize() {
        let windowSize = getWindowSize();
        this.setState({ windowSize });
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
                            this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false });
                        });
                    });
                } else if (!movingDown && !this.state.busy) {
                    this.setState({ busy: true }, () => {
                        let pageNum = this.state.pageNum - 1;
                        pageNum = pageNum > 0 ? pageNum : 0;
                        let query = { offset_number: pageNum * this.state.rowPerPage, display_number: this.state.rowPerPage };
                        backend.get_all_movies(query, (data) => {
                            this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false });
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

    handleGoingTop() {
        this.setState({ showProgress: true }, () => {
            this.setState({ busy: true }, () => {
                let query = { offset_number: 0 * this.state.rowPerPage, display_number: this.state.rowPerPage };
                backend.get_all_movies(query, (data) => {
                    this.setState({ busy: false, dataDisplay: data, showProgress: false, pageNum: 0 });
                });
            });
        })
    }

    handleGoingBottom() {
        console.log('bottom')
    }

    render() {
        return (
            <>
                {this.state.showProgress ? <LinearProgress color="primary" /> : <div style={{ height: 4 }}></div>}

                <div id='scorll-element' style={{ display: 'flex' }}>

                    <div className='tabel-container' style={{ height: this.state.windowSize.h }}>
                        <table width="100%" cellPadding={0} cellSpacing={1}>
                            <tbody >
                                <tr>
                                    {this.state.headers !== null && this.state.headers.map((e, i) => (
                                        <th key={i}>{e.charAt(0).toUpperCase() + e.slice(1)}</th>
                                    ))}
                                </tr>
                                {this.state.dataDisplay && this.state.dataDisplay.map((e, i) => (
                                    <TableRow e={e} i={i} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="btn-styling" onClick={() => this.handleGoingTop()}> top</div>
                        {this.state.totalPageCount >= 0 &&
                            <ScrollBar height={this.state.windowSize.h - 10} currentPage={this.state.pageNum} totalPages={this.state.totalPageCount} callParent={this.jumpToPage} />}
                        <div className="btn-styling" onClick={() => this.handleGoingBottom()}> bottom</div>
                    </div>
                </div>
            </>
        );
    }
}