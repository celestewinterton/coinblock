import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TradeForm from './TradeForm';


const Trade = () => {
  const [data, setData] = useState();
  const no = 6;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${no}&page=1&sparkline=false`

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [url])

  console.log(data)

  return (
    <>
      <h2>Trade</h2>
      <TradeForm />
      <div>Table</div>
      <table className='guestlist-table'>
        <thead><h2>Table</h2>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
            <th>Watch</th>
          </tr>
        </thead>
            {/* {eventRsvps?.map(rsvp => */}
            <tbody>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
            </tbody>
            {/* )} */}
      </table>
    </>
  );
}

export default Trade;
