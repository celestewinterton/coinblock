import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3';


const LineChart = (props) => {
	const {data, width, height } = props;
  const svgRef = useRef();

  useEffect(()=>{
    if (data.length > 0) drawChart();
  },[data])

  const drawChart = () => {

    // establish margins
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    // create the chart area
    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    var xScale = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr('class', 'x-axis')
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(10));

    // Add Y axis
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    // set line coordinates
    const line = d3.line()
      .x(function(d) { return xScale(d.date) })
      .y(function(d) { return yScale(d.value) })

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0052FF")
      .attr("stroke-width", 1.5)
      .attr('class', 'line')
      .attr("d", line)


    // // Create the tooltip
    // const focus = svg
    //   .append('g')
    //   .attr('class', 'focus')
    //   .style('display', 'none');

    // focus.append('circle').attr('r', 5).attr('class', 'circle');

    // const tooltip = d3
    //   .select('#container')
    //   .append('div')
    //   .attr('class', 'tooltip')
    //   .style('opacity', 0);






    d3.select('#container')
      .select('svg')
      .remove();
    d3.select('#container')
      .select('.tooltip')
      .remove();

  }



return (
    <div>
        <svg ref={svgRef}></svg>
        <div id="container"></div>
    </div>
	)

}

export default LineChart;
