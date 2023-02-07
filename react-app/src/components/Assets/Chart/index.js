import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTransactions } from "../../../store/transactions";
import { bigNum, change } from "../../../utils/calc";
import ChartMaker from "./ChartMaker";

const Chart = () => {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.transactions)["chart_data"];
  const [filteredData, setFilteredData] = useState(
    chartData?.slice(chartData?.length - 30, chartData.length)
  );
  const [timeHorizon, setTimeHorizon] = useState(30);
  const currentBalance = filteredData
    ? filteredData[filteredData.length - 1].value
    : null;
  const beginningBalance = filteredData ? filteredData[0].value : null;

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
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
          </div>

          <div className="time-select-container row muted2">
            <div
              className="time-select"
              onClick={() => {
                setTimeHorizon(7);
                setFilteredData(
                  chartData?.slice(chartData?.length - 7, chartData.length)
                );
              }}
            >
              1 Week
            </div>

            <div
              className="time-select"
              onClick={() => {
                setTimeHorizon(30);
                setFilteredData(
                  chartData?.slice(chartData?.length - 30, chartData.length)
                );
              }}
            >
              30 days
            </div>

            <div
              className="time-select"
              onClick={() => {
                setTimeHorizon(90);
                setFilteredData(chartData);
              }}
            >
              90 days
            </div>
          </div>
        </div>
        <ChartMaker data={filteredData} />
      </div>
    </div>
  );
};

export default Chart;
