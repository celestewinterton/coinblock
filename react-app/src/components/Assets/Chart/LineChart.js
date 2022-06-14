import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3';

const dummy = [
  {date: '2021-5-12', value: 150}, {date: '2021-8-12', value: 100450}, {date: '2021-9-12', value: 100350},
  {date: '2021-6-12', value: 1560}, {date: '2021-7-12', value: 13466}, {date: '2021-9-12', value: 10050},
  {date: '2021-12-12', value: 1980}, {date: '2021-2-12', value: 1065}, {date: '2021-10-12', value: 130},
  {date: '2021-3-12', value: 16400}, {date: '2021-1-12', value: 1460}, {date: '2021-1-12', value: 1400}]

const LineChart = (props) => {
	const {width, height } = props;
	const [data, setData] = useState([]);
  let csvURL = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv"

  useEffect(()=>{
    if (data.length > 0) {
      drawChart();
    } else {
      getURLData();
    }
  },[data])

	// gets csv data from a random csv I found
	// ex. [{date: '2021-12-12', value: 1000}]
  const getURLData = async () => {
    let tempData = [];
      await d3.csv(csvURL,
      (() =>{}),
      function(d){
        console.log("WHAT IS THIS???", d);
        tempData.push({date: d3.timeParse("%Y-%m-%d")(d.date), value: parseFloat(d.value)})
      }

    )
      setData(tempData);
  }

const drawChart = () => {

	// establish margins
	const margin = { top: 10, right: 50, bottom: 50, left: 50 };

	// create the chart area
	const svg = d3
	    .select('#time_series')
	    .append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    .attr('transform', `translate(${margin.left},${margin.top})`);

// Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));


    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // set line coordinates
    const line = d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.value) })

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0052FF")
      .attr("stroke-width", 1.5)
      .attr("d", line)
 }


return (
	<div>
	  	<h4> Time Series - http CSV response</h4>
	  <div id='time_series'/>
	</div>
	)

}

export default LineChart;
