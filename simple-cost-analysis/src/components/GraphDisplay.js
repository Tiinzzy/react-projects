import React from "react";

import { Chart } from "react-google-charts";
import Box from '@mui/material/Box';

import './design.css';

export default function GraphDisplay(props) {
    var options = {
        isStacked: true,
        bars: "horizontal",
        bar: { groupWidth: '75%' },
        legend: { position: 'top', maxLines: 3 },
        chartArea: {'width': '85%', 'height': '75%'}
    };

    return (
        <Box style={{ margin: 20 }}>
            {props.graphIndex === 1 && <Chart
                chartType="Bar"
                height={window.innerHeight / 2}
                data={props.dailyData}
            />}

            {props.graphIndex === 2 && <Chart
                chartType="Bar"
                height={window.innerHeight / 2}
                data={props.weekDaysData}
            />}

            {props.graphIndex === 3 && <Chart
                chartType="ColumnChart"
                height={window.innerHeight / 2}
                data={props.detailedSummary}
                options={options}
            />}
        </Box>
    );
};

//https://developers.google.com/chart/interactive/docs/gallery/barchart#stacked-bar-charts