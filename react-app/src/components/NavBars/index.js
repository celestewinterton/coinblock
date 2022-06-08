import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'


const NavBar = ({title}) => {
  return (
    <>
      <nav className='navbar-container'>
        <h6>{title}</h6>
        <div>
          <NavLink to='/users' exact={true} className="navlink" activeClassName='active'>
            Users
          </NavLink>
          <LogoutButton />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
