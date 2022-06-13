import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { bigNum, currency, change, round } from '../../../utils/calc';
import axios from 'axios'


const AssetsTable = () => {
  const [data, setData] = useState({}); // set by CoinGecko API data
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${200}&page=1&sparkline=false`
  const user = useSelector(state => state.session.user)
  const coins = useSelector(state => state.crypto)
  const userCoins = Object.values(coins).filter(coin => Object.keys(user.balances).includes(`${coin.id}`))
  const totalValue = Object.keys(user.balances).reduce((sum, id) => {return sum + (user.balances[id] * (id === "cash" ? 1 : data[coins[id]?.symbol]?.current_price))}, 0)



  // Market Data - Normalized version
  useEffect(() => {
    axios.get(url).then((response) => {
      const newData = {}
      for (let coin of response.data) {
        newData[coin.symbol] = coin
      }
      setData(newData)
    }).catch((error) => {
      console.log(error)
    })
  }, [url])

  // console.log("=======>", userCoins, Object.values(user.balances), "SUM", totalValue)
  return (
    <>
      <div className='bold1 padded'>Your Assets</div>
      <table className='crypto-table' id='assets-table'>
        <thead>
          <tr className='table-headers'>
            <th>Name</th>
            <th>Balance</th>
            <th>Price</th>
            <th>Allocation</th>
          </tr>
        </thead>
        <tbody>
          {userCoins?.map((crypto, idx) =>
          <tr>
            <td>
              <div className='row'>
                <img height="36px" src={data[crypto.symbol]?.image} alt=""></img>
                <div className='column table-coin-name-cell'>
                  <div className='bold2'>{crypto?.name}</div>
                  <div className='muted1'>{crypto?.symbol.toUpperCase()}</div>
                </div>
              </div>
            </td>
            <td>
              <div>{currency(user.balances[crypto.id] * data[crypto.symbol]?.current_price)}</div>
              <div className='muted1'>{round(user.balances[crypto.id])} {crypto?.symbol.toUpperCase()}</div>
            </td>
            <td>
              <div>{currency(data[crypto.symbol]?.current_price)}</div>
              {/* <div className='muted1'>{round(user.balances[crypto.id])} {crypto?.symbol.toUpperCase()}</div> */}
            </td>
            <td>{round((user.balances[crypto.id] * data[crypto.symbol]?.current_price)/totalValue * 100)}%</td>
          </tr>)}
          {/* USD */}
        </tbody>
      </table>
    </>
  );
}

export default AssetsTable;
