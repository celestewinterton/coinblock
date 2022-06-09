import React from 'react';
import { useSelector } from 'react-redux';
import TradeFormModal from '../Trade/TradeFormModal';
import './NavBar.css'
import ProfileButton from './ProfileButton';


const NavBar = ({title}) => {
  const user = useSelector(state => state.session.user)

  return (
    <>
      <nav className='navbar-container'>
        <h6>{title}</h6>
        <div className='navbar-right-buttons'>
          <><TradeFormModal /></>
          <><ProfileButton user={user} /></>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
