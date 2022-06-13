import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { bigNum, currency } from '../../../utils/calc';
import { compareAsc, format, getUnixTime, fromUnixTime, addDays } from 'date-fns'
import { getTransactions } from '../../../store/transactions'
import * as d3 from 'd3';

const Chart = ({user}) => {
  const transactions = useSelector(state => state.transactions)
  const [timeFrame, setTimeFrame] = useState("all")
  const dispatch = useDispatch()
  // const transactions = user.transactions
  // const balance = user.balances
  // const dates = user.transactions.map(txn => txn.created_at)
  const today = new Date()
  // addDays(today, -30)
  // getUnixTime(new Date(dates[0]))
  // fromUnixTime(1433424959)

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch])

  // const userAssets = user.balances
  console.log("CHART ====>", transactions, "New ====>")

  // const coin = coins[cryptoId]?.name.toLowerCase()
  // const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`

  // useEffect(() => {
  //     axios.get(url).then((response) => {
  //         setPrice(response.data[coin].usd)
  //     }).catch((error) => {
  //         console.log(error)
  //     })
  // }, [url])


  //DUMMY DATA, need to pull in API...
  const [data] = useState([25, 50, 10, 89, 37, 89])
  const svgRef = useRef();

  useEffect(() => {


    const w = 400;
    const h = 100;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('margin', '10')
      .style('overflow', 'visible')
      // .style('background', '#d3d3d3')

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
        .attr('stroke', '#0052FF')

  }, [data])

  return (
    <div className='chart-container'>
      <div className='chart-header-container row'>
        <div className='column'>
          <div className='muted2'>Your Balance</div>
          <div>$ (add balance)</div>
          <div>+$ (money All time)</div>
        </div>
        <div className='row muted2'>
          <div className=''>1D</div>
          <div className=''>1W</div>
          <div className=''>1M</div>
          <div className=''>1Y</div>
          <div className=''>All</div>
        </div>
      </div>

      <div className='For styles later...'>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default Chart;
