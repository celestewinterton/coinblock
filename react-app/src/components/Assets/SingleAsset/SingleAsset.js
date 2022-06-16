import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { bigNum, currency, change } from '../../../utils/calc';
import { addToWatchlist, deleteFromWatchlist } from "../../../store/watchlist";
import { authenticate } from "../../../store/session"
import Search from '../../Assets/Search';
import ChartMaker from '../Chart/ChartMaker';
import { useParams } from 'react-router-dom';
import TradeForm from '../../Trade/TradeForm';


const SingleAsset = () => {
  const apiId = useParams().id
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const coins = useSelector(state => state.crypto)
  const watching = user.watchlist.map(item => item.crypto.id)
  const [data, setData] = useState({}); // set by CoinGecko API data
  const cryptoId = Object.values(coins).find(coin => coin.apiId === apiId).id
  // preSetId

  const addToWatch = async (e) => {
    e.preventDefault()
    let data;
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('crypto_id', cryptoId);

    data = await dispatch(addToWatchlist(formData))
    await dispatch(authenticate());
  }

  const removeFromWatch = async (e) => {
    e.preventDefault()
    let id = user.watchlist.find(record => record.crypto.id === parseInt(cryptoId)).id
    await dispatch(deleteFromWatchlist(id))
    await dispatch(authenticate());
  }

  const url = `https://api.coingecko.com/api/v3/coins/${apiId}?localization=false&market_data=true&community_data=true&developer_data=false&sparkline=true`

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

  console.log("CHECKING ===>", user, cryptoId, apiId, data)

  return (
    <>
      <div className='left-section'>
        <h2 className='padded'>Bitcoin</h2>
        <div className='card top-margin'>
          <div className='bold1 padded'>Categories</div>
          {/* <ChartMaker data={data} width={400} height={300} /> */}


        </div>
      </div>



      <div className='right-section'>
        <div className='single-asset-watchlist-star'>
          {!watching.includes(cryptoId) && <button id={cryptoId} onClick={addToWatch} className='unset'>
            Add to Watchlist<i className="fa-regular fa-star"></i></button>}
          {watching.includes(cryptoId) && <button id={cryptoId} onClick={removeFromWatch} className='unset'>
            Watchlist<i className="fa-solid fa-star"></i></button>}
        </div>
          <div className='card top-margin'>
            <TradeForm />
          </div>
      </div>
    </>
  );
}

export default SingleAsset;
