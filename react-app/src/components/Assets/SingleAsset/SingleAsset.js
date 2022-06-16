import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import { bigNum, currency, round } from '../../../utils/calc';
import { addToWatchlist, deleteFromWatchlist } from "../../../store/watchlist";
import { authenticate } from "../../../store/session"
import { loadCrypto } from "../../../store/crypto";
import { useParams } from 'react-router-dom';
import TradeForm from '../../Trade/TradeForm';
import Sparkline from './SingleAssetSparkline';


const SingleAsset = () => {
  const apiId = useParams().id
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const coins = useSelector(state => state.crypto)
  const watching = user.watchlist.map(item => item.crypto.id)
  const [data, setData] = useState({}); // set by CoinGecko API data
  const cryptoId = Object.values(coins).find(coin => coin.apiId === apiId)?.id

  useEffect(() => {
    dispatch(loadCrypto());
  }, [dispatch])

  const addToWatch = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('crypto_id', cryptoId);

    await dispatch(addToWatchlist(formData))
    await dispatch(authenticate());
  }

  const removeFromWatch = async (e) => {
    e.preventDefault()
    let id = user.watchlist.find(record => record.crypto.id === parseInt(cryptoId)).id
    await dispatch(deleteFromWatchlist(id))
    await dispatch(authenticate());
  }

  const url = `https://api.coingecko.com/api/v3/coins/${apiId}?localization=false&market_data=true&community_data=true&developer_data=false&sparkline=true`

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [url])

  const sparkline = data?.market_data?.sparkline_7d?.price

  // console.log("CHECKING ===>", data, data?.market_data?.current_price?.usd)

  function createMarkup() {
    return {__html: `${data?.description?.en}`};
  }

  return (
    <>
      {/* {data && <div>SHOW</div>} */}
      <div className='left-section'>
        <div className='single-asset-header'>
          <img src={data?.image?.small} alt="" height="40px" width="40px"></img>
          <h2 className='padded'>{data.name}</h2>
          <h2 className='gray'>{data?.symbol?.toUpperCase()}</h2>
        </div>
        <div className='card top-margin'>
          <div className='row'>
            <h2 className='padded'>{currency(data?.market_data?.current_price?.usd)}</h2>
            <div className='padded'>{data?.market_data?.price_change_percentage_24h > 0 ? <div className='green'>+{round(data?.market_data?.price_change_percentage_24h)}%</div> : <div className='red'>{round(data?.market_data?.price_change_percentage_24h)}%</div>}</div>
          </div>
          {sparkline && <Sparkline data={sparkline} />}
          <div className='bold1 padded'>Market stats</div>

          <div className='row'>
            <div className='padded column'>
              <div className='muted2'>MARKET CAP</div>
              <div className='muted1'>${bigNum(data?.market_data?.market_cap.usd)}</div>
            </div>

            <div className='padded column'>
              <div className='muted2'>VOLUME (24H)</div>
              <div className='muted1'>{currency(data?.market_data?.total_volume.usd)}</div>
            </div>

            <div className='padded column'>
              <div className='muted2'>CIRCULATING SUPPLY</div>
              <div className='muted1'>{bigNum(data?.market_data?.circulating_supply)}</div>
            </div>
          </div>
        </div>


        <div className='card top-margin'>
          <div className='bold1 padded'>Overview</div>
          <div className='padded column'>
            <div className='muted1' dangerouslySetInnerHTML={createMarkup()} />
            <a className='small-text link padded' href={data?.links?.homepage}>Official website</a>
          </div>
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
            <TradeForm preSetId={cryptoId} />
          </div>
      </div>
    </>
  );
}

export default SingleAsset;
