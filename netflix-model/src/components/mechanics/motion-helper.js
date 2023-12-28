import * as d3 from 'd3';

let a = 0;

export function draw(width, height, datasets) {
    if (a > 0) {
        return;
    }
    a = 1;

    const svg = d3.select('#container');
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    let maxX = 0;
    let maxY = 0;
    for (let ds of datasets) {
        maxX = Math.max(maxX, d3.max(ds.data, (d) => d[0]));
        maxY = Math.max(maxY, d3.max(ds.data, (d) => d[1]));
    }

    const xScale = d3.scaleLinear().domain([0, maxX]).range([0, width]).nice();

    const yScale = d3.scaleLinear().domain([0, maxY]).range([height, 0]).nice();

    svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('class', 'grid').call(d3.axisLeft(yScale).ticks(10).tickSize(-width));

    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
        .call(d3.axisBottom(xScale).ticks(10).tickSize(-height));

    function drawDataset(data) {
        console.log(data);

        for (let i = 1; i < data.length; i++) {
            svg.append("line")
                .attr("class", "line")
                .attr("x1", (d) => margin.left + xScale(data[i - 1][0]))
                .attr("y1", (d) => margin.top + yScale(data[i - 1][1]))
                .attr("x2", (d) => margin.left + xScale(data[i][0]))
                .attr("y2", (d) => margin.top + yScale(data[i][1]))
        }
    }

    for (let ds of datasets) {
        drawDataset(ds.data);
    }
}

export function getTestDatasets() {
    return [
        {
            name: "ds1",
            data: getLineDataset(1, 0, 500)
        },
        {
            name: "ds2",
            data: getLineDataset(0.5, 0, 500)
        }
    ]
}

export function getLineDataset(slope, minX, maxX) {
    let points = []
    for (let x = minX; x <= maxX; x++) {
        points.push([x, x * slope]);
    }
    return points;
}


export function getMotionDataset(startTime, endTime, velocity, acceleration) {
    const motion = [];
    let t0 = startTime
    for (let t = startTime; t <= endTime; t++) {
        let s = (t-t0) * velocity + 0.5 * acceleration * (t-t0) * (t-t0);
        motion.push([t, s]);
    }
    return motion;
}