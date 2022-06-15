import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fromUnixTime, getUnixTime, addDays, differenceInDays } from 'date-fns'
import axios from 'axios'
import { getTransactions } from '../../../store/transactions'
import * as d3 from 'd3';
import LineChart from './LineChart';
import ChartMaker from './ChartMaker';


const Chart = ({user}) => {
  // const transactions = useSelector(state => state.transactions)
  // const [timeFrame, setTimeFrame] = useState("all")
  // const dispatch = useDispatch()
  const transactions = user.transactions
  const balances = user.balances
  const coins = useSelector(state => state.crypto)
  // const user = useSelector(state => state.session.user)
  const userCoins = Object.values(coins).filter(coin => Object.keys(user?.balances)?.includes(`${coin.id}`))
  // const dates = user.transactions.map(txn => txn.created_at)
  // const today = new Date()
  // addDays(today, -30)
  // getUnixTime(new Date(dates[0]))
  // fromUnixTime(1433424959)

    const [data, setData] = useState();
    const [errors, setErrors] = useState([]);
    const [timeHorizon, setTimeHorizon] = useState(30);
    let startDate = addDays(new Date(), -7)
    let url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${getUnixTime(addDays(new Date(), -timeHorizon))}&to=${getUnixTime(new Date())}`









    useEffect(() => {
      let chartData = []
      axios.get(url).then((response) => {
        // console.log("Is this working???", response.data.prices[0])
        response.data.prices.forEach(data => {
          let balances = {}

          // loop through txns to update balances, what I add to chart data will be each of the balances * price

          let obj = {}
          obj["date"] = fromUnixTime(data[0].toString().substring(0, 10))
          obj["value"] = parseFloat(data[1])
          chartData.push(obj)
          // console.log("Is this working???", obj, fromUnixTime(data[0].toString().substring(0, 10)))
        });

        setData(chartData)
      }).catch((error) => {
        console.log("Getting API data error", error)
        setErrors(error.error)
        // 429 = too many requests
      })
    }, [url])

    console.log("", userCoins)

    return (
      <div className='chart-container'>
        <div className='chart-header-container row'>
          <div className='column'>
            <div className='muted2'>Your Balance</div>
            <div>$ (add balance)</div>
            <div>+$ (money All time)</div>
          </div>
          <div className='time-select-container row muted2'>
            <div className='time-select' onClick={() => setTimeHorizon(2)}>1D</div>
            <div className='time-select' onClick={() => setTimeHorizon(7)}>1W</div>
            <div className='time-select' onClick={() => setTimeHorizon(30)}>1M</div>
            <div className='time-select' onClick={() => setTimeHorizon(365)}>1Y</div>
            <div className='time-select' onClick={() => setTimeHorizon(differenceInDays(new Date(), data[0].date))}>ALL</div>
          </div>
        </div>

        <div className='For styles later...'>
          <div>{errors ? errors : null}</div>
          {/* <LineChart data={data} width={400} height={300} /> */}
          <ChartMaker data={data} width={400} height={300} />
        </div>
      </div>
    );
  }

  export default Chart;
