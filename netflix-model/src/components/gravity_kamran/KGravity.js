import React from "react";
import * as d3 from "d3";

import { getVectorDirectinLine, updateBodies } from './physics';

const getWidth = () => 1000;
const getHeight = () => 1000;
const buttonStyle = {
  padding: 5,
  background: 'gray',
  width: 13,
  height: 11,
  cursor: 'pointer',
  borderRadius: 14,
  marginRight: 10,
  display: 'inline-block',
}

const timeStyle = {
  padding: 0,
  width: 13,
  height: 11,
  cursor: 'pointer',
  borderRadius: 14,
  marginRight: 10,
  display: 'inline-block',
  fontSize: 10
}

const COLORS = ['red', 'red', 'blue', 'blue'];

class KGravity extends React.Component {
  constructor() {
    super();

    let data = [
      { id: 0, x: 1000, y: 4800, m: 10, v: { s: 0, a: 0 } },
      { id: 1, x: 1000, y: 5000, m: 1, v: { s: 0.5, a: 0 } },

      { id: 2, x: 3000, y: 4800, m: 10, v: { s: 0, a: 0 } },
      { id: 3, x: 3000, y: 5000, m: 1, v: { s: 0.5, a: 0 } },


      // { id: 2, x: 0, y: 3000, m: 10, v: { s: 0, a: 0 } },
      // { id: 3, x: 0, y: 3500, m: 16, v: { s: 0, a: 0 } },
      // { id: 4, x: 0, y: 2000, m: 6, v: { s: 1, a: 40 } },
    ];

    this.state = {
      svg: null,
      xAxis: null,
      yAxis: null,
      data: data,
      auto: false,
      autoUpdateSpeed: 15,
      time: 0
    };

    this.initSvg = this.initSvg.bind(this);
    this.update = this.update.bind(this);
    this.updateUniverse = this.updateUniverse.bind(this);
  }

  initSvg = () => {
    d3.select("#container").selectAll("*").remove();

    let margin = { top: 10, right: 30, bottom: 30, left: 60 };
    let width = window.innerWidth * 0.9 - margin.left - margin.right;
    let height = window.innerHeight * 0.9 - margin.top - margin.bottom;

    let svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    for (let d of this.state.data) {
      minX = Math.min(d.x, minX);
      minY = Math.min(d.y, minY);
      maxX = Math.max(d.x, maxX);
      maxY = Math.max(d.y, maxY);
    }

    let scale = 10;
    if (maxX < getWidth() * scale) {
      minX = 0;
      maxX = getWidth() * scale;
    } else {
      maxX = maxX + getWidth() * scale / 3;
      minX = maxX - getWidth() * scale / 3 * 2;
    }

    if (maxY < getHeight() * scale) {
      minY = 0;
      maxY = getHeight() * scale;
    } else {
      maxY = maxY + getHeight() * scale / 3;
      minY = maxY - getHeight() * scale / 3 * 2;
    }

    let xAxis = d3.scaleLinear().domain([minX, maxX]).range([0, width]);
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xAxis).tickFormat(d3.format(".1e")));

    let yAxis = d3.scaleLinear().domain([maxY, minY]).range([0, height]);
    svg.append("g").call(d3.axisLeft(yAxis).tickFormat(d3.format(".1e")));

    return { svg, xAxis, yAxis };
  }

  componentDidMount() {
    let { svg, xAxis, yAxis } = this.initSvg();
    this.setState({ svg, xAxis, yAxis }, () => {
      this.update(svg, xAxis, yAxis);
    });

    window.addEventListener("resize", () => {
      console.log(new Date());
      this.initSvg();
    });

    let that = this;
    setInterval(() => {
      if (that.state.auto) {
        that.updateUniverse();
      }
    }, 100);
  }

  update = (svg, xAxis, yAxis) => {
    for (let d of this.state.data) {
      svg.append("circle")
        .attr("cx", this.state.xAxis(d.x))
        .attr("cy", this.state.yAxis(d.y))
        .attr("r", d.m / 2)
        .attr('stroke', COLORS[d.id % COLORS.length])
        .attr("stroke-width", 1)
        .style("fill-opacity", 0.7)
        .style("fill", COLORS[d.id % COLORS.length]);
    }
  }

  updateUniverse() {
    let data = updateBodies(this.state.data);
    for (let i = 0; i < this.state.autoUpdateSpeed; i++) {
      data = updateBodies(data);
    }
    let time = this.state.time + this.state.autoUpdateSpeed + 1;

    let { svg, xAxis, yAxis } = this.initSvg();
    this.setState({ time, data, svg, xAxis, yAxis }, () => {
      this.update(svg, xAxis, yAxis);
    });
  }

  render() {
    return <div>
      <div style={buttonStyle} onClick={() => this.setState({ auto: !this.state.auto })}></div>
      <div style={buttonStyle} onClick={() => this.updateUniverse()}></div>
      <div style={timeStyle} >t={this.state.time}</div>
      <div
        id="container"
        style={{ width: getHeight(), height: getHeight(), display: "block" }}
      ></div>
    </div>
  }
}

export default KGravity;
