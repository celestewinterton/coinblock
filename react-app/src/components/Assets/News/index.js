import React, { useState, useEffect } from 'react';
import { fromUnixTime } from 'date-fns'
import axios from 'axios'


const News = () => {
  const [data, setData] = useState({}); // set cryptoCompare api call
  const url = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'

  useEffect(() => {
    axios.get(url).then((response) => {
      const articles = response.data.Data.slice(0, 4)
      setData(articles)
    }).catch((error) => {
      console.log(error)
    })
  }, [url])

  return (
    <>
        {data.length &&
          <div className='right-section'>
          <div className='card padded'>
            <h6>Latest News</h6>
            <div>{data.map(article => <div key={article.id} className="top-margin row">
              <img src={article?.imageurl} alt="" width="30%" className='cover'></img>
              {/* <div className='muted1'>{fromUnixTime(article?.published_on)}</div> */}
              <div className='news-title-link'>
                <div>{article?.title}</div>
                <a href={article?.url} className='muted1' target="_blank" rel="noopener noreferrer">See the full article</a>
              </div>
            </div>)}</div>
          </div>
          {/* <div className='card top-margin'>
            <h6>Example Card: Interest earned</h6>
          </div> */}
        </div>}
    </>
  );
}

export default News;
