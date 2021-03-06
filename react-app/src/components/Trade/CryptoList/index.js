import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { bigNum, currency, change } from '../../../utils/calc';
import { addToWatchlist, deleteFromWatchlist } from "../../../store/watchlist";
import { authenticate } from "../../../store/session"
import Search from '../../Assets/Search';
import { NavLink } from 'react-router-dom';

const CryptoList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const coins = useSelector(state => state.crypto)
  const watching = user.watchlist.map(item => item.crypto.id)
  const [data, setData] = useState({}); // set by CoinGecko API data
  const [cryptoId, setCryptoId] = useState()
  const [resultsCount, setResultsCount] = useState(12)


  const addToWatch = async (e) => {
    e.preventDefault()
    // setCryptoId(e.target.id)
    // console.log("val1", e.target.id, "val2", cryptoId)
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('crypto_id', cryptoId);

    await dispatch(addToWatchlist(formData))
    await dispatch(authenticate());
  }

  const removeFromWatch = async (e) => {
    e.preventDefault()
    let id = user.watchlist.find(record => record.crypto.id === parseInt(cryptoId))?.id
    await dispatch(deleteFromWatchlist(id))
    await dispatch(authenticate());
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${200}&page=1&sparkline=false`

  // Market Data - Normalized version
  useEffect(() => {
    axios.get(url).then((response) => {
      const newData = {}
      for (let coin of response.data) {
        newData[coin.symbol] = coin
      }
      setData(newData)
    }).catch((error) => {
      // console.log(error)
    })
  }, [url])

  // Market Data - Array version
  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [url])

  // Historicals...
  // const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=monthly`

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [url])
  // console.log("HERE" ,data)
  return (
    <>
      <div className='bold1 padded'>Categories</div>
      <Search coins={Object.values(coins)} />
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
        <tbody>{Object.values(coins)?.slice(0, resultsCount).map((crypto, idx) =>
          <NavLink to={`/${crypto?.apiId}`}>
            <tr>
              <td>
                <div className='row'>
                  <img height="36px" src={data[crypto.symbol]?.image} alt=""></img>
                  <div className='column table-coin-name-cell'>
                    <div className='bold2'>{crypto?.name}</div>
                    <div className='muted1'>{crypto?.symbol.toUpperCase()}</div>
                    {/* <div className='muted1'>{data[crypto.symbol]?.id}</div> */}
                  </div>
                </div>
              </td>
              <td>{currency(data[crypto.symbol]?.current_price)}</td>
              <td>{change(data[crypto.symbol]?.high_24h, data[crypto.symbol]?.current_price)}</td>
              <td>${(bigNum(data[crypto.symbol]?.market_cap))}</td>
              <td>
                {!watching.includes(crypto.id) && <button id={crypto.id} onClick={addToWatch} className='unset'>
                  <i className="fa-regular fa-star" id={crypto.id} onMouseDown={e => setCryptoId(e.target.id)}></i></button>}
                {watching.includes(crypto.id) && <button id={crypto.id} onClick={removeFromWatch} className='unset'>
                  <i className="fa-solid fa-star" id={crypto.id} onMouseDown={e => setCryptoId(e.target.id)}></i></button>}
              </td>
            </tr>
          </NavLink>)}
        </tbody>
        <div className='row'>
          {resultsCount < 192 && <button onClick={e => setResultsCount(resultsCount+12)} className="muted-button wide">View more</button>}
          {resultsCount > 12 && <button onClick={e => setResultsCount(resultsCount-12)} className="muted-button wide">View less</button>}
        </div>

        {/* Use to make Crypto seeder... */}
        {/* {Object.values(data)?.map(crypto => <>
          <div>{crypto?.symbol} = Crypto(name="{crypto?.name}", symbol="{crypto?.symbol}", api_id="{crypto?.id}")</div>
          <div>db.session.add({crypto?.symbol})</div></>)} */}
      </table>
    </>
  );
}

export default CryptoList;
