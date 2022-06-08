import React from 'react';
import './Dashboard.css'
import NavBar from '../NavBars';
import SideNav from '../NavBars/SideNav';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Assets from './Assets'
import Trade from './Trade'


const Dashboard = () => {

  return (
    <>
    <div className="dashboard-container row">
      <SideNav />
      <div className="column">
      <NavBar />
      <Switch>
        <ProtectedRoute path='/' exact={true} >
          <Assets />
        </ProtectedRoute>
        <ProtectedRoute path='/dashboard' exact={true} >
          <Assets />
        </ProtectedRoute>
        <ProtectedRoute path='/trade' exact={true} >
          <Trade />
        </ProtectedRoute>
      </Switch>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
