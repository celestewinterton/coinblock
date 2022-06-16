import React from 'react';
import AssetsTable from './AssetsTable'
import Watchlist from './Watchlist'
import Chart from './Chart';
// import LineChart from './Chart/LineChart';
import './Assets.css'
import SingleAsset from './SingleAsset/SingleAsset';


const Assets = ({user, title}) => {

  return (
    <>
      <div className='dashboard-sections'>
        {!title && <SingleAsset user={user} />}

        {title &&
        <div className='left-section'>
          {title === "Assets" &&
          <div className='card'>
            <Chart user={user} />
            {/* <LineChart user={user} width={600} height={300} /> */}

          </div>}
          {title === "Assets" &&
          <div className='card top-margin'>
            <AssetsTable user={user} />
          </div>}
          {title === "Home" &&
          <div className='card top-margin'>
            <Watchlist user={user} />
          </div>}
        </div>}


        {title &&
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
        </div>}
      </div>
    </>
  );
}

export default Assets;
