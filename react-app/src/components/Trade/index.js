import React from "react";
import TradeForm from "./TradeForm";
import CryptoList from "./CryptoList";
import "./Trade.css";

const Trade = () => {
  return (
    <div className="dashboard-sections">
      <div className="left-section">
        <div className="card">
          <CryptoList />
        </div>
      </div>
      <div className="right-section">
        <div className="card">
          <TradeForm />
        </div>
      </div>
    </div>
  );
};

export default Trade;
