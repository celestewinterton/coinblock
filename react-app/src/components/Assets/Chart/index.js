import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fromUnixTime, getUnixTime, addDays, differenceInDays, isSameDay, parseISO, format } from 'date-fns'
import axios from 'axios'
import { getTransactions } from '../../../store/transactions'
import { loadCrypto } from "../../../store/crypto";
import ChartMaker from './ChartMaker';


const Chart = ({user}) => {
  const testData = useSelector(state => state.transactions)
  const dispatch = useDispatch()
  const transactions = user.transactions
  const balances = user.balances
  const coins = useSelector(state => state.crypto)
  // const user = useSelector(state => state.session.user)
  const userCoins = Object.values(coins).filter(coin => Object.keys(user?.balances)?.includes(`${coin.id}`))
  const apiIds = ['bitcoin']// userCoins.map(coin => coin.apiId) // Ids to loop through for fetch
  const [coin, setCoin] = useState() // Set coin for each fetch request iteration


    const [data, setData] = useState();
    const [errors, setErrors] = useState();
    const [timeHorizon, setTimeHorizon] = useState(30);

    useEffect(() => {
      dispatch(getTransactions());
      dispatch(loadCrypto());
    }, [dispatch])

    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${getUnixTime(new Date('2021-01-01'))}&to=${getUnixTime(new Date())}`

    useEffect(() => {
      let chartData = []
      let balances = {}
      let priceHistory = []

      apiIds.forEach(apiId => {
        setCoin(apiId)

        // console.log("URL =======>", url, apiIds)
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${getUnixTime(new Date('2021-01-01'))}&to=${getUnixTime(new Date())}`).then((response) => {

          response.data.prices.forEach(data => {
            let obj = {}
            obj["date"] = fromUnixTime(data[0].toString().substring(0, 10))
            obj["value"] = parseFloat(data[1])
            priceHistory.push(obj)
          })

          let txnIds = []
          priceHistory.forEach(record => {
            Object.values(transactions).filter(txn => !txnIds.includes(txn.id) && txn.crypto && txn.crypto.apiId === coin && format(new Date(record.date), "MMM d y") == format(new Date(txn.created_at), "MMM d y")).forEach(txn => {
              // console.log("TRANSACTION ===>", txn)

              if (Object.keys(balances).includes(coin) && txn.type === "buy") {
                balances[coin] += parseFloat(txn.quantity)
              } else if (Object.keys(balances).includes(coin) && txn.type === "sell") {
                balances[coin] -= parseFloat(txn.quantity)
              } else {
                balances[coin] = parseFloat(txn.quantity)
              }
              txnIds.push(txn.id)

            })
            let chartItem = {}
            chartItem["date"] = record.date // date for chart
            chartItem["value"] = parseFloat(record.value) * parseFloat(balances[coin]) // price * qty = value for chart
            chartData = [...chartData, chartItem]
            setData(chartData)
          })

          // console.log("Balances ===>", balances, chartData, priceHistory)
          priceHistory = []
        }).catch((error) => {
          console.log("Getting API data", error)
          setErrors(error.error)
        })
      })

    }, [url])

    // console.log("TESTING........", data) // do not comment in - will really slow things down...


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
          {/* <div>{errors ? <div>{errors}</div> : null}</div> */}
          <ChartMaker data={data} width={400} height={300} />
        </div>
      </div>
    );
  }

  export default Chart;
