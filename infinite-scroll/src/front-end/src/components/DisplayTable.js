import React, { Component } from "react";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import Draggable from 'react-draggable';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

import './style.css';

const SECOND_HALF_Y_OFFSET = 20;

export default class DisplayTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: props.headers,
            dataDisplay: props.dataDisplay,
            pageNum: props.pageNum,
            isDragging: false,
            hoveringOnRow: false,
            givenIndex: 0
        }
        this.draggableRef = React.createRef();
    }

    displayMovieToolTip(e, msg, data, index) {
        let tooTipDiv = document.getElementById("movie-tool-tip");
        let tooTipContent = document.getElementById("movie-tool-tip-content");

        if (msg === 'draw') {
            tooTipContent.innerHTML = data.overview;

            const x = e.clientX;
            const y = e.clientY;

            tooTipDiv.style.top = (y < window.innerHeight / 2) ? (y + SECOND_HALF_Y_OFFSET) + 'px' : (y - tooTipDiv.offsetHeight - SECOND_HALF_Y_OFFSET) + 'px';
            tooTipDiv.style.left = (x - tooTipDiv.offsetWidth / 2) + 'px';

            tooTipDiv.style.display = "block";

            this.setState({ hoveringOnRow: true, givenIndex: index });
        } else if (msg === 'hide') {
            tooTipDiv.style.display = "none";
            tooTipContent.innerHTML = '';
            tooTipDiv.style.top = 0;
            tooTipDiv.style.left = 0;

            this.setState({ hoveringOnRow: false });
        }
    }

    handleDrag() {
        this.setState({ isDragging: true });
    };

    handleDragStop() {
        this.setState({ isDragging: false });
    };

    render() {
        return (
            <>
                <table width="100%" cellPadding={0} cellSpacing={1}>
                    <thead style={{ backgroundColor: 'rgb(225, 225, 225)' }}>
                        <tr>
                            <th colSpan={8} style={{ textAlign: 'center', fontSize: 12, fontWeight: '500' }}>{this.state.dataDisplay.length + ' Rows per page & current Page # ' + this.props.pageNum}</th>
                        </tr>
                        <tr>
                            {this.props.headers !== null && this.props.headers.map((e, i) => (
                                <th key={i}>{e.charAt(0).toUpperCase() + e.slice(1)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {this.props.dataDisplay && this.props.dataDisplay.map((e, i) => (
                            <tr key={i} style={{ backgroundColor: (this.state.givenIndex === i && this.state.hoveringOnRow) ? '#a8d7ef' : 'white' }}>
                                <td id="numbered-row">{e.row_number}</td>
                                <td >{e.genres}</td>
                                <td id="numbered-row">{e.imdb}</td>
                                <td id="numbered-row">{e.movie_id}</td>
                                <td onClick={(j) => this.displayMovieToolTip(j, 'draw', e, i)}
                                    style={{ cursor: 'pointer' }}>
                                    {e.overview.substr(0, 150) + '...'}
                                </td>
                                <td >{e.title}</td>
                                <td id="numbered-row">{e.vote}</td>
                                <td id="numbered-row">{e.vote_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Draggable nodeRef={this.draggableRef}
                    onStart={() => this.handleDrag()}
                    onStop={() => this.handleDragStop()}
                    onMouseDown={() => this.handleDrag()}
                    onMouseUp={() => this.handleDragStop()}>
                    <Box id="movie-tool-tip" className='movie-tool-tip' style={{ cursor: this.state.isDragging ? 'all-scroll' : 'auto' }}>
                        <Box ref={this.draggableRef} style={{ paddingBottom: 5, borderBottom: 'solid 1px #858585', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" fontSize={12} fontWeight="bold"> Full Overview</Typography>
                            <Box display="flex" flexGrow={1} />
                            <IconButton onClick={(e) => this.displayMovieToolTip(e, 'hide')} style={{ cursor: 'pointer' }}>
                                <CloseOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box id="movie-tool-tip-content"></Box>
                    </Box>
                </Draggable>
            </>
        );
    }
}