import React from 'react';
import url from '../images/Splash.png'
import './Splash.css'
import { NavLink } from 'react-router-dom';



const Splash = () => {
  return (
    <>
      <div className="splash-container">
        <img src={url} alt="" height="636px" width="645px"></img>
        <div>
          <h3>The future of money is here</h3>
          <h5>Over 98 million people and businesses trust us to buy, sell, and manage crypto.</h5>
          <div>Sign up and get crypto*</div>
          <NavLink to='/signup' exact={true} className="button" activeClassName='active'>
            Sign up
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Splash;
