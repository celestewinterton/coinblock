import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { bigNum, currency, change } from '../../../utils/calc';
import { deleteFromWatchlist } from "../../../store/watchlist";
import { authenticate } from "../../../store/session"

const Watchlist = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const watchlist = useSelector(state => state.session.user.watchlist)
  const apiIds = watchlist.map(item => item.crypto.apiId)
  const [data, setData] = useState({}); // set by CoinGecko API data
  const [cryptoId, setCryptoId] = useState()


  const removeFromWatch = async (e) => {
    e.preventDefault()
    // let id = watchlist.find(record => record.crypto.id === parseInt(cryptoId)).id
    await dispatch(deleteFromWatchlist(cryptoId))
    await dispatch(authenticate());
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${200}&page=1&sparkline=false`

  useEffect(() => {
    axios.get(url).then((response) => {
      const newData = {}
      for (let coin of response.data) {
        newData[coin.id] = coin
      }
      setData(newData)
    }).catch((error) => {
      console.log(error)
    })
  }, [url])
      console.log("WATCHLIST====>", data[apiIds[0]], cryptoId, watchlist)

  return (
    <>
      <div className='bold1 padded'>Watchlist</div>
      <table className='crypto-table'>
        <thead>
          <tr className='table-headers'>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
            <th>Watch</th>
          </tr>
        </thead>
        <tbody>{apiIds.map((apiId, idx) =>
          <tr>
            <td>
              <div className='row'>
                <img height="36px" src={data[apiId]?.image} alt=""></img>
                <div className='column table-coin-name-cell'>
                  <div className='bold2'>{data[apiId]?.name}</div>
                  <div className='muted1'>{data[apiId]?.symbol.toUpperCase()}</div>
                </div>
              </div>
            </td>
            <td>{currency(data[apiId]?.current_price)}</td>
            <td>{change(data[apiId]?.high_24h, data[apiId]?.current_price)}</td>
            <td>${(bigNum(data[apiId]?.market_cap))}</td>
            <td>
              <button id={watchlist.find(record => record.crypto.apiId === apiId).id} onClick={removeFromWatch} className='unset'>
                <i className="fa-solid fa-star" id={watchlist.find(record => record.crypto.apiId === apiId).id} onMouseDown={e => setCryptoId(e.target.id)}></i>
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </>
  );
}

export default Watchlist;
