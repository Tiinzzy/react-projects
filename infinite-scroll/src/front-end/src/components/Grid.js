import React from "react";

import LinearProgress from '@mui/material/LinearProgress';

import BackEndConnection from './BackEndConnection';
import ScrollBar from "./ScrollBar";

import '../App.css';
import './style.css';

const backend = BackEndConnection.INSTANCE();

const ROW_PER_PAGE = 15;

function getWindowSize() {
    return { h: window.innerHeight, w: window.innerWidth }
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
            totalPageCount: -1
        }
        this.handleResize = this.handleResize.bind(this);
        this.jumpToPage = this.jumpToPage.bind(this);
    }

    componentDidMount() {
        let query = { offset_number: this.state.pageNum * ROW_PER_PAGE, display_number: ROW_PER_PAGE };
        backend.get_all_movies(query, (data) => {
            this.setState({ headers: Object.keys(data[0]).filter(h => h !== 'row_number'), dataDisplay: data }, () => {
                let updatedArray = [...this.state.headers];
                updatedArray.unshift('Id');
                this.setState({ headers: updatedArray });
            });
        });

        backend.get_data_length((data) => {
            this.setState({ totalPageCount: Math.floor(data.data_length / ROW_PER_PAGE) });
        });
        document.getElementById('scorll-element').addEventListener('wheel', (e) => this.handelScroll(e));
        // window.addEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({ windowSize: getWindowSize() })
    }

    handelScroll(e) {
        this.setState({ showProgress: true }, function () {
            let movingDown = e.deltaY > 0;
            if (movingDown && !this.state.busy) {
                this.setState({ busy: true }, function () {
                    let pageNum = this.state.pageNum + 1;
                    pageNum = pageNum < this.state.totalPageCount ? pageNum : this.state.totalPageCount;
                    let query = { offset_number: pageNum * ROW_PER_PAGE, display_number: ROW_PER_PAGE };
                    backend.get_all_movies(query, (data) => {
                        this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false });
                    });
                });
            } else if (!movingDown && !this.state.busy) {
                this.setState({ busy: true }, function () {
                    let pageNum = this.state.pageNum - 1;
                    pageNum = pageNum > 0 ? pageNum : 0;
                    let query = { offset_number: pageNum * ROW_PER_PAGE, display_number: ROW_PER_PAGE };
                    backend.get_all_movies(query, (data) => {
                        this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false });
                    });
                });
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
        // window.addEventListener('resize', this.handleResize);
    }

    jumpToPage(newPage) {
        let query = { offset_number: newPage * ROW_PER_PAGE, display_number: ROW_PER_PAGE };
        let totalPageCount = this.state.totalPageCount;
        this.setState({ showProgress: true }, () => {
            backend.get_all_movies(query, (data) => {
                this.setState({ totalPageCount: -1 }, function () {
                    this.setState({ showProgress: false, totalPageCount, dataDisplay: data, pageNum: newPage });
                });
            });
        });
    }

    render() {
        return (
            <div id='scorll-element' style={{ display: 'flex' }}>
                <div style={{ height: 500, border: 'solid 1px #eaeaea', width: '100%', borderRadius: 4, marginTop: 10 }}>
                    {this.state.showProgress ? <div style={{ height: 5, border: 'solid 1px #F4F4F4', width: '100%' }}> <LinearProgress color="primary" /> </div>
                        : <div style={{ height: 5, border: 'solid 1px #F4F4F4', width: '100%' }}></div>}
                    <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={1}>
                        <tbody >
                            <tr>
                                {this.state.headers !== null && this.state.headers.map((e, i) => (
                                    <th key={i}>{e.charAt(0).toUpperCase() + e.slice(1)}</th>
                                ))}
                            </tr>
                            {this.state.dataDisplay && this.state.dataDisplay.map((e, i) => (
                                <tr key={i}>
                                    <td >
                                        {e.row_number}
                                    </td>
                                    <td >
                                        {e.genres}
                                    </td>
                                    <td >
                                        {e.imdb}
                                    </td>
                                    <td >
                                        {e.movie_id}
                                    </td>
                                    <td >
                                        {e.overview.substr(0, 150) + '...'}
                                    </td>
                                    <td >
                                        {e.title}
                                    </td>
                                    <td >
                                        {e.vote}
                                    </td>
                                    <td >
                                        {e.vote_count}
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
                {this.state.totalPageCount >= 0 &&
                    <ScrollBar height={600} currentPage={this.state.pageNum} totalPages={this.state.totalPageCount} callParent={this.jumpToPage} />}
            </div>
        );
    }
}