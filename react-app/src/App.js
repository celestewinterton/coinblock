import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashNav from './components/NavBars/SplashNav';
import Splash from './components/Splash';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/auth/UsersList';
import User from './components/auth/User';
import { authenticate } from './store/session';
import notFound from './components/images/notFound.svg'
import SideNav from './components/NavBars/SideNav';
import NavBar from './components/NavBars';
import Assets from './components/Assets';
import Trade from './components/Trade';

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <SplashNav />
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SplashNav />
          <SignUpForm />
        </Route>
        {!user &&
        <Route path='/' exact={true}>
          <SplashNav />
          <Splash />
        </Route>}

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <div className="dashboard-container row">
          <SideNav />
          <div className="column">
            <NavBar title={`Welcome ${user?.firstName}`} />
            <Switch>
              <ProtectedRoute path='/' exact={true} >
                <Redirect to="/home" />
              </ProtectedRoute>
              <ProtectedRoute path='/dashboard' exact={true} >
                <NavBar title={"Assets"} />
                <Assets user={user} />
              </ProtectedRoute>
              <ProtectedRoute path='/trade' exact={true} >
                <NavBar title={"Trade"} />
                <Trade />
              </ProtectedRoute>
              <ProtectedRoute path='/home' exact={true} >
                <NavBar title={"Home"} />
                <Assets />
              </ProtectedRoute>
            </Switch>
          </div>
        </div>

        <Route>
          <div className='column center padded'>
            <img src={notFound} alt=""></img>
            <div>Page Not Found</div>
            <div className='muted1 padded'>Sorry we couldn't find what you were looking for.</div>
            <NavLink to='/' className='button' exact={true}>Back to Coinblock</NavLink>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
