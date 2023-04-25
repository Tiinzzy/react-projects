import * as React from 'react';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import './style.css';

const test = [1, 2, 3, 4, 5, 6];

export default class DepthTitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <Timeline className='timeline' position="alternate">
                    {test.map((e, i) => (
                        <TimelineItem key={i}>
                            <TimelineSeparator>
                                <TimelineDot className='timelineIcon' />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent className="timelineContentContainer">
                                <Typography className='timelineContent'>
                                    {e}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>))}

                </Timeline>
            </div>
        );
    }
}