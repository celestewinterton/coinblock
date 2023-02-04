import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { bigNum, currency, change } from "../../../utils/calc";
import { addToWatchlist, deleteFromWatchlist } from "../../../store/watchlist";
import { authenticate } from "../../../store/session";
import { NavLink } from "react-router-dom";

const CryptoList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const coins = useSelector((state) => state.crypto);
  const watching = user.watchlist.map((item) => item.crypto.id);
  const [data, setData] = useState({}); // set by CoinGecko API data
  const [cryptoId, setCryptoId] = useState();
  const [resultsCount, setResultsCount] = useState(12);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const addToWatch = async (e) => {
    e.preventDefault();
    // setCryptoId(e.target.id)
    // console.log("val1", e.target.id, "val2", cryptoId)
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("crypto_id", cryptoId);

    await dispatch(addToWatchlist(formData));
    await dispatch(authenticate());
  };

  const removeFromWatch = async (e) => {
    e.preventDefault();
    let id = user.watchlist.find(
      (record) => record.crypto.id === parseInt(cryptoId)
    )?.id;
    await dispatch(deleteFromWatchlist(id));
    await dispatch(authenticate());
  };

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${200}&page=1&sparkline=false`;

  // Market Data - Normalized version
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const newData = {};
        for (let coin of response.data) {
          newData[coin.symbol] = coin;
        }
        setData(newData);
        setFilteredData(newData);
      })
      .catch((error) => {
        // console.log(error)
      });
  }, [url]);

  const filterBySearch = (e) => {
    setFilter(e.target.value);

    let searchResults = Object.values(data).filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredData(searchResults);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  return (
    <>
      <div className="bold1 padded">Categories</div>
      <div className="search-container">
        <input
          onChange={filterBySearch}
          value={filter}
          placeholder="Search all assets"
          // placeholder="&#xF002; Search all assets"
          className="search-input"
        ></input>
        <div onClick={clearFilter} className="clear-filter">
          <i class="fa-solid fa-x"></i>
        </div>
      </div>
      <table className="crypto-table">
        <thead>
          <tr className="table-headers">
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Market Cap</th>
            <th>Watch</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(filteredData)
            ?.slice(0, resultsCount)
            .map((crypto, idx) => (
              <NavLink to={`/${crypto?.id}`}>
                <tr>
                  <td>
                    <div className="row">
                      <img height="36px" src={crypto?.image} alt=""></img>
                      <div className="column table-coin-name-cell">
                        <div className="bold2">{crypto?.name}</div>
                        <div className="muted1">
                          {crypto?.symbol.toUpperCase()}
                        </div>
                        {/* <div className='muted1'>{data[crypto.symbol]?.id}</div> */}
                      </div>
                    </div>
                  </td>
                  <td>{currency(crypto?.current_price)}</td>
                  <td>{change(crypto?.high_24h, crypto?.current_price)}</td>
                  <td>${bigNum(crypto?.market_cap)}</td>
                  <td>
                    {!watching.includes(crypto.id) && (
                      <button
                        id={crypto.id}
                        onClick={addToWatch}
                        className="unset"
                      >
                        <i
                          className="fa-regular fa-star"
                          id={crypto.id}
                          onMouseDown={(e) => setCryptoId(e.target.id)}
                        ></i>
                      </button>
                    )}
                    {watching.includes(crypto.id) && (
                      <button
                        id={crypto.id}
                        onClick={removeFromWatch}
                        className="unset"
                      >
                        <i
                          className="fa-solid fa-star"
                          id={crypto.id}
                          onMouseDown={(e) => setCryptoId(e.target.id)}
                        ></i>
                      </button>
                    )}
                  </td>
                </tr>
              </NavLink>
            ))}
        </tbody>
        <div className="row">
          {filteredData.length > 12 && resultsCount < 192 && (
            <button
              onClick={(e) => setResultsCount(resultsCount + 12)}
              className="muted-button wide"
            >
              View more
            </button>
          )}
          {resultsCount > 12 && (
            <button
              onClick={(e) => setResultsCount(resultsCount - 12)}
              className="muted-button wide"
            >
              View less
            </button>
          )}
        </div>

        {/* Use to make Crypto seeder... */}
        {/* {Object.values(data)?.map(crypto => <>
          <div>{crypto?.symbol} = Crypto(name="{crypto?.name}", symbol="{crypto?.symbol}", api_id="{crypto?.id}")</div>
          <div>db.session.add({crypto?.symbol})</div></>)} */}
      </table>
    </>
  );
};

export default CryptoList;
