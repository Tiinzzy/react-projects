import React from "react";

import BackEndConnection from './BackEndConnection';

import '../App.css';

const backend = BackEndConnection.INSTANCE();

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: null,
            fullData: [],
            pageNum: 0
        }
    }

    componentDidMount() {
        let query = { page_number: this.state.pageNum };
        backend.get_all_movies(query, (data) => {
            this.setState({ headers: Object.keys(data[0]), fullData: data, dataDisplay: data.slice(0, 10) }, () => {
                let updatedArray = [...this.state.headers];
                updatedArray.unshift('Id');
                this.setState({ headers: updatedArray });
            });
        })

        document.getElementById('scorll-element').addEventListener('scroll', (e) => this.handelScroll(e));
    }

    handelScroll(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        console.log(0)
        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            console.log(1)
            let len = this.state.fullData.length;
            len = len < this.state.fullData.length ? len + 10 : len;
            let updatedData = this.state.dataDisplay.slice(0, len)
            let updatedPageNumber = this.state.pageNum++
            this.setState({ dataDisplay: updatedData, pageNum: updatedPageNumber }, () => {
                let query = { page_number: this.state.pageNum };
                backend.get_all_movies(query, (data) => {
                    this.setState({ dataDisplay: data.slice(0, 10) });
                })
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div id='scorll-element' style={{ overflowY: 'scroll', height: 400, border: 'solid 1px black', width: '100%' }}>
                    <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={1}>
                        <tbody >
                            <tr>
                                {this.state.headers !== null && this.state.headers.map((e, i) => (
                                    <th key={i}>{e}</th>
                                ))}
                            </tr>
                            {this.state.dataDisplay && this.state.dataDisplay.map((e, i) => (
                                <tr key={i}>
                                    <td >
                                        {i}
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
                                        {e.overview}
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