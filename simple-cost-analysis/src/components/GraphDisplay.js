import React from "react";

import { Chart } from "react-google-charts";

import Box from '@mui/material/Box';

import './design.css';

export default function GraphDisplay(props) {

    return (
        <Box style={{ margin: 20}}>
            <Chart
                chartType="Bar"
                width="100%"
                height="500px"
                data={props.data}
            />
        </Box>
    );

};