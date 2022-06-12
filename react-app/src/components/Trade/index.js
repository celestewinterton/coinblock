import React from 'react';
import TradeForm from './TradeForm';
import CryptoList from './CryptoList';
import './Trade.css'

const Trade = () => {
  // const [data, setData] = useState();

  // const no = 10;
  // const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${no}&page=1&sparkline=false`

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [url])


  // historical url...
  // const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max&interval=monthly`

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }, [url])

  // console.log(data)
  return (
    <div className='dashboard-sections'>
      <div className='left-section'>
        <div className='card'>
          <CryptoList />
        </div>
      </div>
      <div className='right-section'>
        <div className='card'>
          <TradeForm />
        </div>
      </div>
    </div>
  );
}

export default Trade;
