import React from "react";
import * as d3 from "d3";
import { updateUniverse } from './physics';
import { Box } from "@mui/material";

const getWidth = () => window.innerWidth * 0.95;
const getHeight = () => window.innerHeight * 0.90;

const MAX_Y = 10000;
const MAX_X = 10000;

const TICK_MILI_SEC = 1 * 100;

const myTextButtonStyle = {
  marginTop: 10,
  marginLeft: 10,
  padding: 5,
  userSelect: 'none',
  cursor: 'pointer',
  background: '#eaeaea',
  fontSize: 12,
  borderRadius: 4
}

class Gravity extends React.Component {
  constructor() {
    super();

    this.state = {
      svg: null,
      xAxis: null,
      yAxis: null,
      universe: [
        { id: 0, x: 3000, y: 6000, r: 50, s: 0, a: 0 },
        { id: 1, x: 3000, y: 5000, r: 10, s: 1, a: 0 },

        { id: 3, x: 7000, y: 6000, r: 50, s: 0, a: 0 },
        { id: 4, x: 7000, y: 5000, r: 10, s: 1, a: 0 },
      ],
      autoUpdate: false
    };

    this.initSvg = this.initSvg.bind(this);
    this.update = this.update.bind(this);
    this.handleTick = this.handleTick.bind(this);
  }

  initSvg = () => {
    d3.select("#container").selectAll("*").remove();

    let margin = { top: 10, right: 30, bottom: 30, left: 60 };
    let width = getWidth() - margin.left - margin.right;
    let height = getHeight() - margin.top - margin.bottom;

    let svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let minX = 0;
    let maxX = MAX_X;
    let minY = 0;
    let maxY = MAX_Y;

    let xAxis = d3.scaleLinear().domain([minX, maxX]).range([0, width]);
    svg.append("g").attr("class", "x-axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xAxis));

    let yAxis = d3.scaleLinear().domain([minY, maxY]).range([height, 0]);
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yAxis));

    this.setState({ svg, xAxis, yAxis }, () => {
      this.update();
    });
  }

  componentDidMount() {
    this.initSvg();

    window.addEventListener("resize", () => {
      this.initSvg();
    });

    setInterval(() => {
      if (this.state.autoUpdate) {
        this.setState({ universe: updateUniverse(this.state.universe) }, this.update)
      }
    }, TICK_MILI_SEC);
  }

  update = () => {
    const { svg, xAxis, yAxis, universe } = this.state;

    const maxX = d3.max(universe, d => d.x);
    const maxY = d3.max(universe, d => d.y);

    const marginThreshold = 50; 

    // xAxis.domain([0, maxX + marginThreshold]);
    // yAxis.domain([0, maxY + marginThreshold]);

    svg.select(".x-axis").call(d3.axisBottom(xAxis));
    svg.select(".y-axis").call(d3.axisLeft(yAxis));

    svg.selectAll("circle").remove();
    svg
      .append("g")
      .selectAll("dot")
      .data(universe)
      .enter()
      .append("circle")
      .attr("cx", d => xAxis(d.x))
      .attr("cy", d => yAxis(d.y))
      .attr("r", d => d.r / 10)
      .style("fill", "red");
  }

  handleTick = () => {
    if (!this.state.autoUpdate) {
      this.setState({ universe: updateUniverse(this.state.universe) }, this.update);
    }
  }

  render() {
    return <div>
      <Box display='flex' justifyContent='center'>
        {!this.state.autoUpdate && <Box style={myTextButtonStyle} onClick={this.handleTick}>Click to update universe!</Box>}
        <Box style={myTextButtonStyle} onClick={() => this.setState({ autoUpdate: !this.state.autoUpdate })}>{this.state.autoUpdate ? 'Click to manual mode!' : 'Click to auto mode!'} </Box>
      </Box>

      <div
        id="container"
        style={{ width: getWidth(), height: getHeight(), display: "block"}}
      ></div>
    </div>
  }
}

export default Gravity;
