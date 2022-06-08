import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import TradeFormModal from '../Trade/TradeFormModal';
import './NavBar.css'


const NavBar = ({title}) => {
  return (
    <>
      <nav className='navbar-container'>
        <h6>{title}</h6>
        <div>
          <TradeFormModal />
          <LogoutButton />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
