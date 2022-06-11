import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { bigNum } from '../../../utils/calc';
import { addToWatchlist, deleteFromWatchlist } from "../../../store/watchlist";
import { authenticate } from "../../../store/session"

const CryptoList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const coins = useSelector(state => state.crypto)
  const watching = user.watchlist.map(item => item.crypto[0].id)
  const [data, setData] = useState({}); // set by CoinGecko API data
  const [cryptoId, setCryptoId] = useState()
  const [resultsCount, setResultsCount] = useState(15)

  const addToWatch = async (e) => {
    e.preventDefault()
    let data;
    // setCryptoId(e.target.id)
    console.log("val1", e.target.id, "val2", cryptoId)
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('crypto_id', cryptoId);

    data = await dispatch(addToWatchlist(formData))
    await dispatch(authenticate());
  }

  const removeFromWatch = async (e) => {
    e.preventDefault()
    let id = user.watchlist.find(record => record.crypto[0].id === parseInt(cryptoId)).id
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
      console.log(error)
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

  return (
    <>
      <h2 className='padded'>Categories</h2>
      <div className='padded'>Search bar ??? w/ select option for "All assets" or "Watchlist"</div>
      <table className='crypto-table padded'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
            <th>Watch</th>
          </tr>
        </thead>
        {Object.values(coins)?.slice(0, resultsCount).map((crypto, idx) =>
        <tbody>
          {data[crypto.symbol] && <tr>
          <td>
            <div className='row'>
              <img height="36px" src={data[crypto.symbol]?.image} alt=""></img>
              <div className='column'>
                <div>{crypto?.name}</div>
                <div>{crypto?.symbol.toUpperCase()}</div>
              </div>
            </div>
          </td>
          <td>{data[crypto.symbol]?.current_price}</td>
          <td>{data[crypto.symbol]?.name}</td>
          <td>{(bigNum(data[crypto.symbol]?.market_cap))}</td>
          <td>
            {!watching.includes(crypto.id) && <button id={crypto.id} onClick={addToWatch} className='unset'><i class="fa-regular fa-star" id={crypto.id} onMouseDown={e => setCryptoId(e.target.id)}></i></button>}
            {watching.includes(crypto.id) &&
            <button id={crypto.id} onClick={removeFromWatch} className='unset'><i class="fa-solid fa-star" id={crypto.id} onMouseDown={e => setCryptoId(e.target.id)}></i></button>}

          </td>
          </tr>}
        </tbody>)}

        <div className='row'>
          {resultsCount < 195 && <div onClick={e => setResultsCount(resultsCount+15)}>View more</div>}
          {resultsCount > 15 && <div onClick={e => setResultsCount(resultsCount-15)}>View less</div>}
        </div>

        {/* Use to make Crypto seeder... */}
        {/* {data?.map(crypto => <>
          <div>{crypto?.symbol} = Crypto(name="{crypto?.name}", symbol="{crypto?.symbol}", price={crypto?.current_price})</div>
          <div>db.session.add({crypto?.symbol})</div></>)} */}
      </table>
    </>
  );
}

export default CryptoList;
