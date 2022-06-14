import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { bigNum, currency, change } from '../../../utils/calc';
import { addToWatchlist, deleteFromWatchlist } from "../../../store/watchlist";
import { authenticate } from "../../../store/session"

const Watchlist = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const coins = useSelector(state => state.crypto)
  const watching = user.watchlist.map(item => item.crypto.id)
  const [data, setData] = useState({}); // set by CoinGecko API data
  const [cryptoId, setCryptoId] = useState()
  const [resultsCount, setResultsCount] = useState(12)


  const removeFromWatch = async (e) => {
    e.preventDefault()
    let id = user.watchlist.find(record => record.crypto[0].id === parseInt(cryptoId)).id
    await dispatch(deleteFromWatchlist(id))
    await dispatch(authenticate());
  }


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
        {/* <tbody>{Object.values(coins)?.slice(0, resultsCount).map((crypto, idx) =>
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
            <td>{currency(data[crypto.symbol]?.current_price)}</td>
            <td>{change(data[crypto.symbol]?.low_24h, data[crypto.symbol]?.current_price)}</td>
            <td>${(bigNum(data[crypto.symbol]?.market_cap))}</td>
            <td>
              {!watching.includes(crypto.id) && <button id={crypto.id} onClick={addToWatch} className='unset'>
                <i className="fa-regular fa-star" id={crypto.id} onMouseDown={e => setCryptoId(e.target.id)}></i></button>}
              {watching.includes(crypto.id) && <button id={crypto.id} onClick={removeFromWatch} className='unset'>
                <i className="fa-solid fa-star" id={crypto.id} onMouseDown={e => setCryptoId(e.target.id)}></i></button>}
            </td>
          </tr>)}
        </tbody> */}
        <div className='row'>
          {resultsCount < 192 && <button onClick={e => setResultsCount(resultsCount+12)} className="muted-button wide">View more</button>}
          {resultsCount > 12 && <button onClick={e => setResultsCount(resultsCount-12)} className="muted-button wide">View less</button>}
        </div>
      </table>
    </>
  );
}

export default Watchlist;
