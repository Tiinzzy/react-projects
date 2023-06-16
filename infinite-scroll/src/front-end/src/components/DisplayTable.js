import React, { Component } from "react";

import Box from '@mui/material/Box';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Popover from '@mui/material/Popover';

import './style.css';

export default class DisplayTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: props.headers,
            dataDisplay: props.dataDisplay,
            pageNum: props.pageNum,
            hoveringOnRow: false,
            givenIndex: 0,
            anchorElement: null
        }
        this.colsePopover = this.colsePopover.bind(this);
    }

    handleDrag() {
        this.setState({ isDragging: true });
    };

    handleDragStop() {
        this.setState({ isDragging: false });
    };

    openPopover(e, data, index) {
        this.setState({ anchorElement: e.target, overview: data.overview, givenIndex: index, hoveringOnRow: true })
    }

    colsePopover() {
        this.setState({ anchorElement: null, hoveringOnRow: false })
    }

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
                                <td onClick={(event) => this.openPopover(event, e, i)}
                                    style={{ cursor: 'pointer' }}>
                                    {e.overview.substr(0, 150) + ' ...'}
                                </td>
                                <td >{e.title}</td>
                                <td id="numbered-row">{e.vote}</td>
                                <td id="numbered-row">{e.vote_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Popover
                    style={{ width: '55%' }}
                    open={Boolean(this.state.anchorElement)}
                    anchorEl={this.state.anchorElement}
                    onClose={this.colsePopover}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    <Box p={2} >
                        <Box style={{ borderBottom: 'solid 1px #858585', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" fontSize={12} fontWeight="bold"> Full Overview</Typography>
                            <Box display="flex" flexGrow={1} />
                            <IconButton onClick={this.colsePopover} style={{ cursor: 'pointer' }}>
                                <CloseOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Typography variant="body1" fontSize={12} fontWeight="500" pt={2}> {this.state.overview}</Typography>
                    </Box>
                </Popover>
            </>
        );
    }
}