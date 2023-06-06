import React from "react";

import BackEndConnection from './BackEndConnection';

import '../App.css';

const backend = BackEndConnection.INSTANCE();

export default class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: null
        }
    }

    componentDidMount() {
        backend.get_all_movies((data) => {
            this.setState({ headers: Object.keys(data[0]), fullData: data.slice(0, 10) });
        })

        document.getElementById('scorll-element').addEventListener('scroll', (e) => this.handelScroll(e));
    }

    handelScroll(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            let len = this.state.fullData.length;
            len = len < this.state.fullData.length ? len + 5 : len;
            let updatedData = this.state.fullData.slice(0, len)
            this.setState({ fullData: updatedData })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handelScroll);
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div id='scorll-element' style={{ overflowY: 'scroll', height: 100, border: 'solid 1px black', width: '100%' }}>
                    <table width="100%" style={{ fontSize: '80%', backgroundColor: 'white', maring: 5 }} cellPadding={0} cellSpacing={1}>
                        <tbody >
                            <tr>
                                {this.state.headers !== null && this.state.headers.map((e, i) => (
                                    <th key={i} width='0.07%'>{e}</th>
                                ))}
                            </tr>
                            {this.state.fullData && this.state.fullData.map((e, i) => (
                                <tr key={i}>
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