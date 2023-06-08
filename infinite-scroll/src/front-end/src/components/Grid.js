import React from "react";

import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import BackEndConnection from './BackEndConnection';

import '../App.css';

const backend = BackEndConnection.INSTANCE();

const ROW_PER_PAGE = 20;
const ROW_PER_SCROLL = ROW_PER_PAGE / 2;

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: null,
            dataDisplay: [],
            pageNum: 0,
            busy: false,
            showProgress: false
        }
    }

    componentDidMount() {
        let query = { offset_number: this.state.pageNum, display_number: ROW_PER_PAGE };
        backend.get_all_movies(query, (data) => {
            this.setState({ headers: Object.keys(data[0]).filter(h => h !== 'row_number'), dataDisplay: data }, () => {
                let updatedArray = [...this.state.headers];
                updatedArray.unshift('Id');
                this.setState({ headers: updatedArray });
            });
        });

        backend.get_data_length((data) => { this.setState({ fullDataLength: data[0].data_length }) });

        document.getElementById('scorll-element').addEventListener('wheel', (e) => this.handelScroll(e));
    }

    handelScroll(e) {
        this.setState({ showProgress: true }, function () {
            let movingDown = e.deltaY > 0;
            if (movingDown && !this.state.busy) {
                this.setState({ busy: true }, function () {
                    let pageNum = this.state.pageNum + ROW_PER_SCROLL;
                    pageNum = pageNum < this.state.fullDataLength - ROW_PER_PAGE ? pageNum : this.state.fullDataLength - ROW_PER_PAGE;
                    let query = { offset_number: pageNum, display_number: ROW_PER_PAGE };
                    backend.get_all_movies(query, (data) => {
                        this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false });
                    });
                });
            } else if (!movingDown && !this.state.busy) {
                this.setState({ busy: true }, function () {
                    let pageNum = this.state.pageNum - ROW_PER_SCROLL;
                    pageNum = pageNum >= 0 ? pageNum : 0;
                    let query = { offset_number: pageNum, display_number: ROW_PER_PAGE };
                    backend.get_all_movies(query, (data) => {
                        this.setState({ busy: false, pageNum, dataDisplay: data, showProgress: false });
                    });
                });
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div id='scorll-element' style={{ height: 500, border: 'solid 1px #eaeaea', width: '100%', borderRadius: 4, marginTop: 10 }}>
                    {this.state.showProgress ? <div style={{ height: 5, border: 'solid 1px #F4F4F4', width: '100%' }}> <LinearProgress color="primary" /> </div>
                        : <div style={{ height: 5, border: 'solid 1px #F4F4F4', width: '100%' }}></div>}
                    {/* {this.state.showProgress ? <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={this.state.showProgress} >
                        <CircularProgress color="inherit" /> </Backdrop> : <span></span>} */}
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
            </div>
        );
    }
}