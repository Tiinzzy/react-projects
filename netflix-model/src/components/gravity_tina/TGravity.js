import React from "react";
import * as d3 from "d3";

import { universeTick } from './physics';

const UNIVERESE_WIDTH = 1000;
const UNIVERESE_HEIGHT = 1000;
const TIME_QUANTA = 100;

const buttonStyle = {
  padding: 5,
  background: 'gray',
  width: 13,
  height: 11,
  cursor: 'pointer',
  borderRadius: 14,
  marginRight: 10,
  display: 'inline-block',
  userSelect: 'none'
}

const timeStyle = {
  padding: 0,
  width: 13,
  height: 11,
  cursor: 'pointer',
  borderRadius: 14,
  marginRight: 10,
  display: 'inline-block',
  fontSize: 10,
  userSelect: 'none'
}

const COLORS = ['black'];

let bigBangData = (count) => {
  count = count || 100;
  let universer = [];
  for (let i = 0; i < count; i++) {
    universer.push({
      id: i,
      m: 1,
      x: Math.floor(UNIVERESE_WIDTH * Math.random()),
      y: Math.floor(UNIVERESE_HEIGHT * Math.random()),
      dx: 0,
      dy: 0
    });
  }
  return universer;
}

let universeTimer = null;

class TGravity extends React.Component {
  constructor() {
    super();

    this.state = {
      svg: null,
      xAxis: null,
      yAxis: null,
      data: [{ id: 0, x: 200, y: 300, m: 10, dx: 0, dy: 0 }, { id: 2, x: 300, y: 300, m: 2, dx: 0, dy: 10 }],
      auto: false,
      time: 0
    };

    this.initSvg = this.initSvg.bind(this);
    this.update = this.update.bind(this);
    this.updateUniverse = this.updateUniverse.bind(this);
  }

  componentDidMount() {
    let { svg, xAxis, yAxis } = this.initSvg();
    this.setState({ svg, xAxis, yAxis }, () => {
      this.update();
    });

    window.addEventListener("resize", () => {
      let { svg, xAxis, yAxis } = this.initSvg();
      this.setState({ svg, xAxis, yAxis }, () => {
        this.update();
      });
    });

    let that = this;

    if (universeTimer !== null) {
      clearInterval(universeTimer);
    }

    universeTimer = setInterval(() => {
      if (that.state.auto) {
        that.updateUniverse();
      }
    }, TIME_QUANTA);
  }


  updateUniverse() {
    let data = universeTick([...this.state.data]);
    let time = this.state.time + 1;
    this.setState({ time, data }, () => {
      this.update(this.state.svg);
    });
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

    if (maxX < UNIVERESE_WIDTH) {
      minX = 0;
      maxX = UNIVERESE_WIDTH;
    } else {
      maxX = maxX + UNIVERESE_WIDTH;
      minX = maxX - UNIVERESE_WIDTH;
    }

    if (maxY < UNIVERESE_HEIGHT) {
      minY = 0;
      maxY = UNIVERESE_HEIGHT;
    } else {
      maxY = maxY + UNIVERESE_HEIGHT;
      minY = maxY - UNIVERESE_HEIGHT;
    }

    let xAxis = d3.scaleLinear().domain([minX, maxX]).range([0, width]);
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xAxis).tickFormat(d3.format(".1e")));

    let yAxis = d3.scaleLinear().domain([maxY, minY]).range([0, height]);
    svg.append("g").call(d3.axisLeft(yAxis).tickFormat(d3.format(".1e")));

    return { svg, xAxis, yAxis };
  }

  update = () => {
    d3.select("#container").selectAll("circle").remove();
    for (let d of this.state.data) {
      this.state.svg.append("circle")
        .attr("cx", this.state.xAxis(d.x))
        .attr("cy", this.state.yAxis(d.y))
        .attr("r", d.m / 2)
        .attr('stroke', COLORS[d.id % COLORS.length])
        .attr("stroke-width", 1)
        .style("fill-opacity", 0.7)
        .style("fill", COLORS[d.id % COLORS.length]);
    }
  }

  render() {
    return <div>
      <div style={buttonStyle} onClick={() => this.setState({ auto: !this.state.auto })}></div>
      <div style={buttonStyle} onClick={() => this.updateUniverse()}></div>
      <div style={timeStyle} >t={this.state.time}</div>
      <div
        id="container"
        style={{ width: UNIVERESE_HEIGHT, height: UNIVERESE_HEIGHT, display: "block" }}
      ></div>
    </div>
  }
}

export default TGravity;
