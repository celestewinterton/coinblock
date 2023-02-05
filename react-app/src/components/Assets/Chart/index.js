import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fromUnixTime, format } from "date-fns";
import axios from "axios";
import { getTransactions } from "../../../store/transactions";
import { loadCrypto } from "../../../store/crypto";
import ChartMaker from "./ChartMaker";
import { bigNum, change } from "../../../utils/calc";

const Chart = () => {
  const dispatch = useDispatch();
  const balanceHistory = useSelector((state) => state.transactions);
  const user = useSelector((state) => state.session.user);
  const coins = useSelector((state) => state.crypto);
  const userCoins = Object.values(coins).filter((coin) =>
    Object.keys(user?.balances)?.includes(`${coin.id}`)
  );
  const apiIds = userCoins.map((coin) => coin.apiId); // Ids to loop through for fetch, set to this for testing => ['bitcoin']
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [errors, setErrors] = useState();
  const [timeHorizon, setTimeHorizon] = useState(90);
  const currentBalance = data ? data[data.length - 1].value : null;
  const beginningBalance = data ? data[0].value : null;

  useEffect(() => {
    dispatch(loadCrypto());
    dispatch(getTransactions());
  }, [dispatch]);

  // let url = `https://api.coingecko.com/api/v3/coins/${apiIds[0]}/market_chart?vs_currency=usd&days=90&interval=daily`;

  useEffect(() => {
    let chartData = {};
    dispatch(loadCrypto());
    dispatch(getTransactions());

    apiIds.forEach((apiId) => {
      let url = `https://api.coingecko.com/api/v3/coins/${apiId}/market_chart?vs_currency=usd&days=90&interval=daily`;

      axios
        .get(url, {
          mode: "no-cors",
        })
        .then((response) => {
          response.data.prices.forEach((data) => {
            const toReadableDate = fromUnixTime(
              data[0].toString().substring(0, 10)
            );
            const day = format(toReadableDate, "MMM d y");

            if (day in chartData) {
              const addToDate =
                parseFloat(data[1]) *
                  (apiId in balanceHistory[day]
                    ? balanceHistory[day][apiId]
                    : 0) +
                balanceHistory[day]["cash"] / apiIds.length;
              chartData[day].value += addToDate;
            } else {
              const obj = {};
              obj["date"] = day;
              obj["value"] =
                parseFloat(data[1]) *
                  (apiId in balanceHistory[day]
                    ? balanceHistory[day][apiId]
                    : 0) +
                balanceHistory[day]["cash"] / apiIds.length;
              chartData[day] = obj;
            }
            setData(Object.values(chartData));
            setFilteredData(Object.values(chartData));
            console.log(data);
          });
        })
        .catch((error) => {
          console.log("Getting API data", error);
          setErrors(error.error);
        });
    });
  }, [user]);

  return (
    <>
      <div className="card bottom-margin">
        <div className="chart-container">
          <div className="chart-header-container row">
            <div className="column">
              <div className="muted2">Your Balance</div>
              {currentBalance ? (
                <>
                  <h2 className="top-margin">${bigNum(currentBalance)}</h2>
                  <div className="row">
                    <div
                      className="bold2 top-margin"
                      style={
                        change(beginningBalance, currentBalance)[0] == "+"
                          ? { color: "#098551" }
                          : { color: "#CF202F" }
                      }
                    >
                      {change(beginningBalance, currentBalance)}
                    </div>
                    <div className="bold2 time-select top-margin">
                      over the last {timeHorizon} days
                    </div>
                  </div>
                </>
              ) : (
                <h2 className="red">
                  Please select a time horizon{" "}
                  <i class="fa-solid fa-arrow-right"></i>
                </h2>
              )}
              {/* <div>+(money All time)</div> */}
              {/* {data && <h4 className='red bold2'>Please select a time horizon</h4>} */}
            </div>
            <div className="time-select-container row muted2">
              <div
                className="time-select"
                onClick={() => {
                  setTimeHorizon(7);
                  setFilteredData(data?.slice(data?.length - 7, data.length));
                }}
              >
                1 Week
              </div>
              <div
                className="time-select"
                onClick={() => {
                  setTimeHorizon(30);
                  setFilteredData(data?.slice(data?.length - 30, data.length));
                }}
              >
                30 days
              </div>
              <div
                className="time-select"
                onClick={() => {
                  setTimeHorizon(90);
                  setFilteredData(data);
                }}
              >
                90 days
              </div>
              {/* <div className='time-select' onClick={() => setTimeHorizon(differenceInDays(new Date(), user?.transactions[0]?.date))}>ALL</div> */}
            </div>
          </div>

          <div className="For styles later...">
            {/* <div>{errors ? <div>{errors}</div> : null}</div> */}
            {/* {errors && <div>Looks like there was an error fetching price data from the API</div>} */}
            <ChartMaker data={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
