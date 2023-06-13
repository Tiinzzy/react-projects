import React from "react";

import './style.css';

export default class DisplayTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: props.headers,
            dataDisplay: props.dataDisplay
        }
    }

    displayMovieToolTip(e, msg, data) {
        if (msg === 'draw') {
            let tooTipDiv = document.getElementById("movie-tool-tip");
            tooTipDiv.style.top = (e.clientY < 900) ? (e.clientY + 'px') : ((e.clientY - 70) + 'px');
            tooTipDiv.style.left = (e.clientX + 15) + 'px';
            tooTipDiv.innerText = data.overview;
            tooTipDiv.style.display = "block";
        } else if (msg === 'hide') {
            let tooTipDiv = document.getElementById("movie-tool-tip");
            tooTipDiv.style.display = "none";
            tooTipDiv.innerText = '';
            tooTipDiv.style.top = 0;
            tooTipDiv.style.left = 0;
        }
    }

    render() {
        return (
            <>
                <table width="100%" cellPadding={0} cellSpacing={1}>
                    <tbody >
                        <tr>
                            {this.props.headers !== null && this.props.headers.map((e, i) => (
                                <th key={i}>{e.charAt(0).toUpperCase() + e.slice(1)}</th>
                            ))}
                        </tr>
                        {this.props.dataDisplay && this.props.dataDisplay.map((e, i) => (
                            <tr key={i}>
                                <td >{e.row_number}</td>
                                <td >{e.genres}</td>
                                <td >{e.imdb}</td>
                                <td >{e.movie_id}</td>
                                <td onMouseLeave={(j) => this.displayMovieToolTip(j, 'hide', e)} onMouseMove={(j) => this.displayMovieToolTip(j, 'draw', e)}
                                    style={{ cursor: 'pointer' }}>
                                    {e.overview.substr(0, 150) + '...'}
                                    <div id="movie-tool-tip" className='movie-tool-tip'></div>
                                </td>
                                <td >{e.title}</td>
                                <td >{e.vote}</td>
                                <td >{e.vote_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}