import { LineChart, Line, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { round, currency } from '../../../utils/calc'


const ChartMaker = ({data}) => {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log(payload, label, active)
      return (
        <div className="custom-tooltip card">
          <p className="tooltip-value">{`${isNaN(payload[0].value) ? 0 : currency(round(payload[0].value))}`}</p>
          <p className="tooltip-date">{`${label}`}</p>
        </div>
      );
    }
    return null;
  };

  // const formatXAxis = (axis) => {format(axis, 'MMM d y')}


  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart width={500} height={400} data={data} margin={{ top: 30, right: 0, left: 0, bottom: 5 }}>
        <Line type="monotone" dataKey="value" stroke="#0052FF" dot={false} name="Value" />
        <XAxis dataKey="date" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
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
