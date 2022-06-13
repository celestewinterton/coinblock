import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { bigNum, currency, change, round } from '../../../utils/calc';
import { authenticate } from "../../../store/session"
import { loadCrypto } from "../../../store/crypto";
import axios from 'axios'


const AssetsTable = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({}); // set by CoinGecko API data
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${200}&page=1&sparkline=false`
  const coins = useSelector(state => state.crypto)
  const user = useSelector(state => state.session.user)
  const userCoins = Object.values(coins).filter(coin => Object.keys(user?.balances)?.includes(`${coin.id}`))


  useEffect(() => {
    dispatch(loadCrypto());
  }, [dispatch])

  // useEffect(() => {
  //   (async() => {
  //     await dispatch(authenticate());
  //   })();
  // }, [dispatch]);

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


  const totalValue = Object.keys(user.balances).reduce((sum, id) => {return sum + (user.balances[id] * (id === "cash" ? 1 : data[coins[id]?.symbol]?.current_price))}, 0)
  console.log("=======>", userCoins, Object.values(user.balances), "SUM", totalValue)


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

          <tr>
            <td>
              <div className='row'>
                <svg aria-hidden="true" width="32" height="32" viewBox="0 0 32 32" data-testid="USD-icon" className="CurrencyIcon__makeFiatIcon-sc-12mnnqm-0 iOHINY" size="32" bgcolor="backgroundAccent" lighten="0" data-element="CurrencyIcon" role="img"><path d="M16 0C7.176 0 0 7.176 0 16s7.176 16 16 16 16-7.176 16-16S24.824 0 16 0zm0 30.06C8.242 30.06 1.94 23.759 1.94 16 1.94 8.242 8.241 1.94 16 1.94c7.758 0 14.06 6.302 14.06 14.06 0 7.758-6.302 14.06-14.06 14.06z" fill="#1652F0"></path><path d="M16.291 14.914c-1.969-.281-2.347-.747-2.347-1.668 0-.873.67-1.493 1.95-1.493 1.163 0 1.832.407 2.104 1.338a.486.486 0 00.465.359h1.018a.456.456 0 00.446-.543c-.32-1.474-1.318-2.366-2.88-2.648V8.727a.48.48 0 00-.485-.485h-.97a.48.48 0 00-.484.485v1.503c-1.92.272-3.161 1.552-3.161 3.19 0 2.124 1.28 2.949 3.995 3.317 1.842.3 2.366.698 2.366 1.745 0 1.048-.892 1.746-2.143 1.746-1.697 0-2.25-.737-2.453-1.697a.497.497 0 00-.476-.398h-1.115a.45.45 0 00-.446.524c.281 1.61 1.319 2.802 3.433 3.084v1.532a.48.48 0 00.485.485h.97a.48.48 0 00.484-.485V21.74c2.008-.32 3.278-1.717 3.278-3.433.01-2.27-1.377-3.026-4.034-3.394z" fill="#1652F0"></path></svg>
                <div className='column table-coin-name-cell'>
                  <div className='bold2'>US Dollar</div>
                  <div className='muted1'>USD</div>
                </div>
              </div>
            </td>
            <td><div>{currency(user.balances.cash)}</div></td>
            <td><div>{currency(1)}</div></td>
            <td>{round((user.balances.cash)/totalValue * 100)}%</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default AssetsTable;
