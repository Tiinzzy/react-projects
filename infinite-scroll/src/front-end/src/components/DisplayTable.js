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
        console.log(e.clientY, '<< client y', e.screenY, '<< screen y', window.innerHeight, '<< innerHeight')
        let toolTipDiv = document.getElementById("movie-tool-tip");
        if (msg === 'draw') {
            toolTipDiv.innerText = data.overview;
            let value =(e.clientY < window.innerHeight / 2) ? (e.clientY + SECOND_HALF_Y_OFFSET) + 'px' : (e.clientY - toolTipDiv.offsetHeight - SECOND_HALF_Y_OFFSET) + 'px';
            console.log(value, '<<<<<<<<<<')
            toolTipDiv.style.top = value;
            toolTipDiv.style.left = (e.clientX - toolTipDiv.offsetWidth / 2) + 'px';
            toolTipDiv.style.display = "block";
        } else if (msg === 'hide') {
            toolTipDiv.style.display = "none";
            toolTipDiv.innerText = '';
            toolTipDiv.style.top = 0;
            toolTipDiv.style.left = 0;
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
                                <td onMouseMove={(j) => this.displayMovieToolTip(j, 'draw', e)} onMouseLeave={(j) => this.displayMovieToolTip(j, 'hide', e)}
                                    onClick={(j) => this.displayMovieToolTip(j, 'draw', e)}
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