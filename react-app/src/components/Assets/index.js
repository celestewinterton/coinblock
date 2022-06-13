import React from 'react';
import Chart from './Chart'
import AssetsTable from './AssetsTable'
import Watchlist from './Watchlist'
import './Assets.css'

const Assets = ({user, title}) => {

  return (
    <>
      <div className='dashboard-sections'>

        <div className='left-section'>
          <div className='card'>
            <Chart user={user} />
          </div>
          {title === "Assets" &&
          <div className='card top-margin'>
            <AssetsTable user={user} />
          </div>}
          <div className='card top-margin'>
            <h2>Watchlist</h2>
            <table>Table Data: Name, Price, Change, Market cap, Watch</table>
            <Watchlist user={user} />
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
      </div>
    </>
  );
}

export default Assets;
