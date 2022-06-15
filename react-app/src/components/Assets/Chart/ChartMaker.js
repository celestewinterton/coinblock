import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';


const ChartMaker = ({data}) => {


  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="value" stroke="#0052FF" dot={false} />
      <XAxis dataKey="date" />
      <Tooltip />
    </LineChart>
  );
}

export default ChartMaker;






// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import axios from 'axios'

// const SimpleChart = () => {
//   const dispatch = useDispatch();
//   const watchlist = useSelector(state => state.session.user.watchlist)
//   const [data, setData] = useState({}); // set by CoinGecko API data



//   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${200}&page=1&sparkline=false`

//   useEffect(() => {
//     axios.get(url).then((response) => {
//       const newData = {}
//       for (let coin of response.data) {
//         newData[coin.id] = coin
//       }
//       setData(newData)
//     }).catch((error) => {
//       console.log(error)
//     })
//   }, [url])

//   return (
//     <>
//       <div>HELLO</div>
//     </>
//   );
// }

// export default SimpleChart;
