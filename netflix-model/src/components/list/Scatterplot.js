import React, { Component } from 'react';
import * as d3 from 'd3';

import '../../App.css';

class Scatterplot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objectData: props.objectData,
            toBeMerged: props.toBeMerged,
            maxMass: props.maxMass,
            spaceSize: props.spaceSize
        };
    }

    componentDidMount() {
        const svg = d3.select('#scatterplot-svg');
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const width = 900 - margin.left - margin.right;
        const height = 900 - margin.top - margin.bottom;

        const maxX = this.state.spaceSize;
        const maxY = this.state.spaceSize;

        const xScale = d3
            .scaleLinear()
            .domain([0, maxX])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, maxY])
            .range([height, 0]);

        const wScale = d3.scaleLinear().domain([0, this.state.maxMass]).range([1, 50]);

        svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('class', 'grid').call(d3.axisLeft(yScale).ticks(10).tickSize(-width));

        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
            .call(d3.axisBottom(xScale).ticks(10).tickSize(-height));

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', margin.left + width / 2)
            .attr('y', height + margin.top + 30)
            .text('X Axis');

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .attr('y', margin.left - 20)
            .attr('x', 0 - height / 2)
            .text('Y Axis');

        const lines = new Set();
        for (let d of this.state.toBeMerged) {
            let dstr = d.toSorted().toString()
            if (!lines.has(dstr)) {
                svg.append('line')
                    .style("stroke", "#ccc")
                    .style("stroke-width", 1)
                    .style("stroke-dasharray", "8 8")
                    .attr('x1', xScale(d[0]) + margin.left)
                    .attr('y1', yScale(d[1]) + margin.top)
                    .attr('x2', xScale(d[2]) + margin.left)
                    .attr('y2', yScale(d[3]) + margin.top);
                lines.add(dstr);
            }
        }

        svg.selectAll('circle')
            .data(this.state.objectData)
            .enter()
            .append('circle')
            .attr('class', 'circle')
            .attr('cx', (d) => xScale(d.x) + margin.left)
            .attr('cy', (d) => yScale(d.y) + margin.top)
            .attr('r', (d) => wScale(d.m));

    }

    render() {
        return (
            <div id="scatterplot-container">
                <svg id="scatterplot-svg" width="900" height="900"></svg>
            </div>
        );
    }
}

export default Scatterplot;
