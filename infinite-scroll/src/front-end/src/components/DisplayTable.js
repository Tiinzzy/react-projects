import React from "react";

import './style.css';

const SECOND_HALF_Y_OFFSET = 15;

export default class DisplayTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: props.headers,
            dataDisplay: props.dataDisplay,
            pageNum: props.pageNum
        }
    }

    displayMovieToolTip(e, msg, data) {
        let tooTipDiv = document.getElementById("movie-tool-tip");
        if (msg === 'draw') {
            tooTipDiv.innerText = data.overview;
            tooTipDiv.style.top = (e.clientY < window.innerHeight / 2) ? (e.clientY + SECOND_HALF_Y_OFFSET) + 'px' : (e.clientY - tooTipDiv.offsetHeight - SECOND_HALF_Y_OFFSET) + 'px';
            tooTipDiv.style.left = (e.clientX - tooTipDiv.offsetWidth / 2) + 'px';
            tooTipDiv.style.display = "block";
        } else if (msg === 'hide') {
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
                    <thead style={{ backgroundColor: 'rgb(225, 225, 225)' }}>
                        <tr>
                            <th colSpan={8} style={{ textAlign: 'center' }}>{'Current Page #: ' + this.props.pageNum}</th>
                        </tr>
                        <tr>
                            {this.props.headers !== null && this.props.headers.map((e, i) => (
                                <th key={i}>{e.charAt(0).toUpperCase() + e.slice(1)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.dataDisplay && this.props.dataDisplay.map((e, i) => (
                            <tr key={i}>
                                <td >{e.row_number}</td>
                                <td >{e.genres}</td>
                                <td >{e.imdb}</td>
                                <td >{e.movie_id}</td>
                                <td onClick={(j) => this.displayMovieToolTip(j, 'draw', e)}
                                    style={{ cursor: 'pointer' }}>
                                    {e.overview.substr(0, 150) + '...'}
                                </td>
                                <td >{e.title}</td>
                                <td >{e.vote}</td>
                                <td >{e.vote_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div id="movie-tool-tip" className='movie-tool-tip' onClick={(e) => this.displayMovieToolTip(e, 'hide')}></div>
            </>
        );
    }
}