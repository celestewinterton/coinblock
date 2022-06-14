import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import { fromUnixTime } from 'date-fns'
import * as d3 from 'd3';
import axios from 'axios'



const LineChart = (props) => {
	const {width, height } = props;
	const [data, setData] = useState([]);
  const svgRef = useRef();

  let url = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1392577232&to=1422577232"

  useEffect(() => {
    axios.get(url).then((response) => {
      let chartData = []
      // console.log("Is this working???", response.data.prices[0])
      response.data.prices.forEach(data => {
        let obj = {}
        obj["date"] = d3.timeParse("%Y-%m-%d")(fromUnixTime(data[0]))
        obj["value"] = parseFloat(data[1])
        chartData.push(obj)
        console.log("Is this working???", obj, data[0], data[1])
      });

      setData(chartData)
    }).catch((error) => {
      console.log("Getting API data error", error)
    })
  }, [url])




	// gets csv data from a random csv I found
	// ex. [{date: '2021-12-12', value: 1000}]
  // const getData = async () => {
  //   let chartData = [];
  //     await d3.json(url,
  //     (() =>{}),
  //     function(d){
  //       console.log("WHAT IS THIS???", d);
  //       chartData.push({date: d3.timeParse("%Y-%m-%d")(d.date), value: parseFloat(d.value)})
  //     }

  //   )
  //     setData(chartData);
  // }
  useEffect(()=>{
    if (data.length > 0) drawChart();
  },[data])


  const drawChart = () => {

    // establish margins
    const margin = { top: 10, right: 50, bottom: 50, left: 50 };

    // create the chart area
    const svg = d3.select(svgRef.current)
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
	  <h4>Line Chart...</h4>
    <svg ref={svgRef}></svg>
	</div>
	)

}

export default LineChart;
