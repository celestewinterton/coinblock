import React, { useState, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import { fromUnixTime, getUnixTime, addDays } from 'date-fns'
import axios from 'axios'
import { getTransactions } from '../../../store/transactions'
import * as d3 from 'd3';
import LineChart from './LineChart';
import ChartMaker from './ChartMaker';


const Chart = ({user}) => {
  // const transactions = useSelector(state => state.transactions)
  // const [timeFrame, setTimeFrame] = useState("all")
  // const dispatch = useDispatch()
  // const transactions = user.transactions
  // const balance = user.balances
  // const dates = user.transactions.map(txn => txn.created_at)
  // const today = new Date()
  // addDays(today, -30)
  // getUnixTime(new Date(dates[0]))
  // fromUnixTime(1433424959)

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState([]);
    let startDate = addDays(new Date(), -7)
    let url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${getUnixTime(startDate)}&to=${getUnixTime(new Date())}`

    useEffect(() => {
      axios.get(url).then((response) => {
        let chartData = []
        // console.log("Is this working???", response.data.prices[0])
        response.data.prices.forEach(data => {
          let obj = {}
          obj["date"] = fromUnixTime(data[0].toString().substring(0, 10))
          obj["value"] = parseFloat(data[1])
          chartData.push(obj)
          console.log("Is this working???", obj, fromUnixTime(data[0].toString().substring(0, 10)))
        });

        setData(chartData)
      }).catch((error) => {
        console.log("Getting API data error", error)
        // 429 = too many requests
      })
    }, [url])




    return (
      <div className="App">
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
            <div>{errors ? errors : null}</div>
            {/* <LineChart data={data} width={400} height={300} /> */}
            <ChartMaker data={data} width={400} height={300} />
          </div>
        </div>
      </div>
    );
  }

  export default Chart;
