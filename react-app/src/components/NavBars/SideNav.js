import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'


const SideNav = () => {
  return (
    <>
      <nav className='side-nav-container'>
        <NavLink to='/' exact={true} activeClassName='active' className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="Coinbase logo" viewBox="0 0 48 48" width="32" height="32" className="cds-iconStyles-iogjozt"><title>Coinbase logo</title><path d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z" fill="#0052FF"></path></svg>
        </NavLink>
        <NavLink to='/users' exact={true} className="sidenav" activeClassName='active'>
          <i class="fa-solid fa-chart-pie"></i>
          Users
        </NavLink>
        <NavLink to='/dashboard' exact={true} className="sidenav" activeClassName='active'>
          <i class="fa-solid fa-chart-pie"></i>
          Assets
        </NavLink>
        <NavLink to='/trade' exact={true} className="sidenav" activeClassName='active'>
          <i class="fa-solid fa-chart-pie"></i>
          Trade
        </NavLink>
      </nav>
    </>
  );
}

export default SideNav;