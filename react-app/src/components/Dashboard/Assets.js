import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import {FiArrowUpRight, FiArrowDown} from 'react-icons/fa'


const Assets = () => {
  // const [data, setData] = useState();
  // const no = 6;
  // const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${no}&page=1&sparkline=false`


  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [])

  // console.log(data)


  return (
    <>
      <div className='dashboard-sections'>
        <div className='left-section'>
          <div className='card'>
            <h2>Portfolio Chart</h2>
          </div>
          <div className='card top-margin'>
            <h2>Your assets</h2>
            <table>Table Data: Name, Balance, Price, Allocation</table>
          </div>
          <div className='card top-margin'>
            <h2>Watchlist</h2>
            <table>Table Data: Name, Price, Change, Market cap, Watch</table>
          </div>
        </div>
        <div className='right-section'>
          <div className='card'>
            <h6>Example Card: Get $50 to earn on ETH</h6>
          </div>
          <div className='card top-margin'>
            <h6>Example Card: Interest earned</h6>
          </div>
          <div className='card top-margin'>
            <h6>Example Card: Learn and earn</h6>
          </div>
        </div>
        {/* <div>{data[0].name}</div>
        <div>{data[0].symbol}</div>
        <div>circulating_spply {data[0].circulating_spply}</div>
        <div>current_price {data[0].current_price}</div>
        <div>market_cap {data[0].market_cap}</div>
        <div>rank {data[0].market_cap_rank}</div>
        <div>{data[0].max_supply}</div>
        <div>{data[0].total_volume}</div>
        <img src={data[0].image} alt=""></img> */}
      </div>
    </>
  );
}

export default Assets;
