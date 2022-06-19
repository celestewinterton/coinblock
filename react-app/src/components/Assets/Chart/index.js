import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fromUnixTime, format } from 'date-fns'
import axios from 'axios'
import { getTransactions } from '../../../store/transactions'
import { loadCrypto } from "../../../store/crypto";
import { authenticate } from "../../../store/session";
import ChartMaker from './ChartMaker';
import { bigNum } from '../../../utils/calc';


const Chart = ({user}) => {
  const balanceHistory = useSelector(state => state.transactions)
  const dispatch = useDispatch()
  const coins = useSelector(state => state.crypto)
  const userCoins = Object.values(coins).filter(coin => Object.keys(user?.balances)?.includes(`${coin.id}`))
  const apiIds = userCoins.map(coin => coin.apiId) // Ids to loop through for fetch, set to this for testing => ['bitcoin']
  const [data, setData] = useState();
  const [errors, setErrors] = useState();
  const [timeHorizon, setTimeHorizon] = useState(30);
  const currentBalance = data ? data[data.length - 1].value : null
  // console.log("ARE WE GETTING THIS?", data, currentBalance, balanceHistory)

  // useEffect(() => {
  //   dispatch(authenticate());
  //   dispatch(loadCrypto());
  //   dispatch(getTransactions());
  // }, [dispatch])


  // let url = `https://api.coingecko.com/api/v3/coins/${apiId}/market_chart/range?vs_currency=usd&from=${getUnixTime(addDays(new Date(), -7))}&to=${getUnixTime(new Date())}`
  let url = `https://api.coingecko.com/api/v3/coins/${apiIds[0]}/market_chart?vs_currency=usd&days=${parseInt(timeHorizon)}&interval=daily`

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getTransactions());
      await dispatch(loadCrypto());
    })();

    let chartData = {}

    apiIds.forEach(apiId => {
      url = `https://api.coingecko.com/api/v3/coins/${apiId}/market_chart?vs_currency=usd&days=${timeHorizon}&interval=daily`

      // console.log("URL =======>", url, apiIds)
      axios.get(url, {
        mode : 'no-cors',
      }).then((response) => {
        // console.log("Response", response.data.prices)
        response.data.prices.forEach(data => {
          // console.log("Dates", fromUnixTime(data[0].toString().substring(0, 10)), data[0], data[1])
          const toReadableDate = fromUnixTime(data[0].toString().substring(0, 10))
          const day = format(toReadableDate, 'MMM d y')


          if (day in chartData) {
            const addToDate = (parseFloat(data[1]) * (apiId in balanceHistory[day] ? balanceHistory[day][apiId] : 0)) + balanceHistory[day]['cash']/apiIds.length
            chartData[day].value += addToDate
            console.log("Already in ================>", chartData[day], (parseFloat(data[1]) * (apiId in balanceHistory[day] ? balanceHistory[day][apiId] : 0)),  (balanceHistory[day]['cash']/apiIds.length))
          }
          else {
            const obj = {}
            obj['date'] = day
            obj['value'] = (parseFloat(data[1]) * (apiId in balanceHistory[day] ? balanceHistory[day][apiId] : 0)) + (balanceHistory[day]['cash']/apiIds.length)
            chartData[day] = obj
            console.log("Adding to chartData =======>", chartData[day], (parseFloat(data[1]) * (apiId in balanceHistory[day] ? balanceHistory[day][apiId] : 0)),  (balanceHistory[day]['cash']/apiIds.length))
          }
          console.log("CHARTDATA =======>", chartData, chartData[day], chartData[day].value, day)
          setData(Object.values(chartData))
        })

      }).catch((error) => {
        console.log("Getting API data", error)
        setErrors(error.error)
      })
    })

    // dispatch(authenticate());
  }, [dispatch, url])


  return (
    <>
      {data && balanceHistory &&
      <div className='card'>
        <div className='chart-container'>
          <div className='chart-header-container row'>
            <div className='column'>
              <div className='muted2'>Your Balance</div>
              {currentBalance && <h2>${bigNum(currentBalance)}</h2>}
              {/* <div>+(money All time)</div> */}
            </div>
            <div className='time-select-container row muted2'>
              <div className='time-select' onClick={() => setTimeHorizon(7)}>1 Week</div>
              <div className='time-select' onClick={() => setTimeHorizon(30)}>30 days</div>
              <div className='time-select' onClick={() => setTimeHorizon(90)}>90 days</div>
              {/* <div className='time-select' onClick={() => setTimeHorizon(differenceInDays(new Date(), user?.transactions[0]?.date))}>ALL</div> */}
            </div>
          </div>

          <div className='For styles later...'>
            {/* <div>{errors ? <div>{errors}</div> : null}</div> */}
            {errors && <div>Looks like there was an error fetching price data from the API</div>}
            <ChartMaker data={data} />
          </div>
        </div>
      </div>
      }
    </>
  );
}

export default Chart;
