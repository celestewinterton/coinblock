import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TradeForm from './TradeForm';
import './Trade.css'
import { toBillions, toDate, toUnix } from '../../utils/calc';

const Trade = () => {
  const [data, setData] = useState();

  const no = 20;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${no}&page=1&sparkline=false`

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [url])

  // historical url...
  // const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=monthly`

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [url])


  // console.log(data)

  return (
    <div className='dashboard-sections'>
      <div className='left-section'>
        <div className='card'>
          <table className='crypto-table'>
            <thead><h2>Table</h2>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Change</th>
                <th>Market Cap</th>
                <th>Watch</th>
              </tr>
            </thead>
                {data?.map(crypto =>
                <tbody>
                  <td>
                    <div className='row'>
                      <img height="36px" src={crypto?.image} alt=""></img>
                      <div className='column'>
                        <div>{crypto?.name}</div>
                        <div>{crypto?.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td>{crypto?.current_price}</td>
                  <td>{crypto?.name}</td>
                  <td>${toBillions(crypto?.market_cap)}B</td>
                  <td>
                    <i class="fa-solid fas-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </td>
                </tbody>)}
          </table>
        </div>
      </div>
      <div className='right-section'>
        <div className='card'>
          <TradeForm />
        </div>
      </div>
    </div>
  );
}

export default Trade;
