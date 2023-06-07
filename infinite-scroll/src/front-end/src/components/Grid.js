import React from "react";

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
            fullData: [],
            pageNum: 0,
            maxRowCount: 20000,
            busy: false
        }
    }

    componentDidMount() {
        let query = { offset_number: this.state.pageNum,  };
        backend.get_all_movies(query, (data) => {
            console.log(data)
            this.setState({ headers: Object.keys(data[0]).filter(h => h !== 'row_number'), dataDisplay: data }, () => {
                let updatedArray = [...this.state.headers];
                updatedArray.unshift('Id');
                this.setState({ headers: updatedArray });
            });
        })

        document.getElementById('scorll-element').addEventListener('wheel', (e) => this.handelScroll(e));
    }

    handelScroll(e) {
        let movingDown = e.deltaY > 0;
        if (movingDown && !this.state.busy) {
            this.setState({ busy: true }, function () {
                let pageNum = this.state.pageNum + ROW_PER_SCROLL;
                pageNum = pageNum < this.state.maxRowCount - ROW_PER_PAGE ? pageNum : this.state.maxRowCount - ROW_PER_PAGE;
                let query = { offset_number: pageNum };
                backend.get_all_movies(query, (data) => {
                    this.setState({ busy: false, pageNum, dataDisplay: data });
                });
            });
        } else if (!movingDown && !this.state.busy) {
            this.setState({ busy: true }, function () {
                let pageNum = this.state.pageNum - ROW_PER_SCROLL;
                pageNum = pageNum >= 0 ? pageNum : 0;
                let query = { offset_number: pageNum };
                backend.get_all_movies(query, (data) => {
                    console.log(data)
                    this.setState({ busy: false, pageNum, dataDisplay: data });
                });
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div id='scorll-element' style={{ height: 500, border: 'solid 1px #eaeaea', width: '100%', borderRadius: 4 }}>
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