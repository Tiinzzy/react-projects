import React from "react";
import * as d3 from "d3";

import { updateUniverse } from './physics';
import { Box } from "@mui/material";

const getWidth = () => window.innerWidth * 0.95;
const getHeight = () => window.innerHeight * 0.95;
const TICK_MILI_SEC = 5 * 100;

const myTextButtonStyle = {
  marginTop: 10,
  marginLeft: 10,
  padding: 5,
  userSelect: 'none',
  cursor: 'pointer',
  background: '#eaeaea',
  padding: '2px 5px 2px 5px',
  fontSize: 12,
  borderRadius: 4
}

let that = null;

class Gravity extends React.Component {
  constructor() {
    super();
    that = this;

    this.state = {
      svg: null,
      xAxis: null,
      yAxis: null,
      universe: [
        { x: 0, y: 100, r: 3, s: 5, a: 0 },
        { x: 310, y: 290, r: 20, s: 1, a: -Math.PI / 2 },
        { x: 1500, y: 800, r: 5, s: 15, a: Math.PI / 4 * 3 }
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

    let xAxis = d3.scaleLinear().domain([0, getWidth()]).range([0, width]);
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xAxis));

    let yAxis = d3.scaleLinear().domain([0, getHeight()]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(yAxis));

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
      if (that.state.autoUpdate) {
        that.setState({ universe: updateUniverse(that.state.universe) }, that.update)
      }
    }, TICK_MILI_SEC);
  }

  update = () => {
    d3.select("#container").selectAll("circle").remove();
    this.state.svg
      .append("g")
      .selectAll("dot")
      .data(this.state.universe)
      .enter()
      .append("circle")
      .attr("cx", (d) => this.state.xAxis(d.x))
      .attr("cy", (d) => this.state.yAxis(d.y))
      .attr("r", (d) => d.r)
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
        {!this.state.autoUpdate && <Box style={myTextButtonStyle} onClick={(e) => this.handleTick(e)}>Click to update universe!</Box>}
        <Box style={myTextButtonStyle} onClick={(e) => this.setState({ autoUpdate: !this.state.autoUpdate })}>{this.state.autoUpdate ? 'Click to manual mode!' : 'Click to auto mode!'} </Box>
      </Box>

      <div
        id="container"
        style={{ width: getHeight(), height: getHeight(), display: "block" }}
      ></div>
    </div>
  }
}

export default Gravity;
