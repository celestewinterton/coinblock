import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

const Watchlist = () => {
  const user = useSelector(state => state.session.user)

  return (
    <div>Watchlist TBD

    </div>
  );
}

export default Watchlist;
