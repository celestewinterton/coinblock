import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './Auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('satoshi@btc.com', 'whitepaper'));
  }

  return (
    <div className='login-page-container'>
      <div className='login-form-demo'>
        <form onSubmit={onLogin}>
          <h5>Sign in to Coinblock</h5>
          <div className='column top-margin'>
            <div className="form-errors">{errors.email ? <p><i class="fa-solid fa-triangle-exclamation"></i>{errors.email}</p> : null}</div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='column'>
            <div className="form-errors">{errors.password ? <p><i class="fa-solid fa-triangle-exclamation"></i>{errors.password}</p> : null}</div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button className='top-margin wide login-button' type='submit'>Login</button>
          </div>
        </form>
        <button className='top-margin wide muted-button login-button' onClick={(e) => demoLogin(e)}>Try a demo</button>
        <div className='top-margin muted1'>Don't have an account?<span> </span>
          <NavLink to='/signup' exact={true} className="link">
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
