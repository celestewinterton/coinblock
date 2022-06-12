import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3';

const simpleChart = () => {

  //DUMMY DATA, need to pull in API...
  const user = useSelector(state => state.session.user)
  const [data] = useState([25, 50, 10, 89, 37, 89])
  const svgRef = useRef();

  useEffect(() => {
    const w = 400;
    const h = 100;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin', '10')
      .style('overflow', 'visible')

    //scaling
    const xscale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w])

    const yscale = d3.scaleLinear()
      .domain([h, 0])
      .range([0, h])

    const generateScaledLine = d3.line()
      .x((d, i) => xscale(i))
      .y(yscale)
      .curve(d3.curveCardinal);

    //setting axes
    const xAxis = d3.axisBottom(xscale)
      .ticks(data.length)
      .tickFormat(i => i + 1);

    const yAxis = d3.axisLeft(yscale)
      .ticks(5)
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
    svg.append('g')
      .call(yAxis)

    //data for svg
    svg.selectAll('.line')
      .data([data])
      .join('path')
        .attr('d', d => generateScaledLine(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')

  }, [data])

  return (
    <div className='App'>Basic d3 Line Chart
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default simpleChart;
