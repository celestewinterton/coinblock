import React, { useState, useEffect } from 'react';
import AssetsTable from './AssetsTable'
import Watchlist from './Watchlist'
import Chart from './Chart';
// import LineChart from './Chart/LineChart';
import './Assets.css'
import SingleAsset from './SingleAsset/SingleAsset';
import News from './News';


const Assets = ({user, title}) => {

  return (
    <>
      <div className='dashboard-sections'>
        {!title && <SingleAsset user={user} />}

        {title &&
        <div className='left-section'>
          {title === "Assets" &&
          <>
            <Chart user={user} />
            <div className='card'>
              <AssetsTable user={user} />
            </div>
          </>}
          {title === "Home" &&
          <div className='card'>
            <Watchlist user={user} />
          </div>}
        </div>}

        {title && <News />}
      </div>
    </>
  );
}

export default Assets;
