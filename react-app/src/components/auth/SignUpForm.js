import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import svg from '../images/Signup.svg'
import './Auth.css'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [checked, setChecked] = useState(false) // Need send user an error message
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!checked) errors.push("You must be over 18 years of age to sign up for Coinblock")
    if (password === repeatPassword && checked) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('satoshi@btc.com', 'whitepaper'));
  }

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='signup-page-container'>
      <div className='row'>
        <div className='column signup-left'>
          <div>
            <form onSubmit={onSignUp}>
              <h5>Create an account</h5>
              <div className='top-margin'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className='label'>Required fields have an asterisk: *</div>
              <div className='row top-margin'>
                <div className='column'>
                  <label>First name*</label>
                  <input
                    className='firstName-input'
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                  ></input>
                </div>
                <div className='column'>
                  <label>Last name*</label>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                  ></input>
                </div>
              </div>
              <div className='column'>
                <label>Email*</label>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                ></input>
              </div>
              <div className='column'>
                <label>Password*</label>
                <input
                  type='password'
                  name='password'
                  placeholder='Minimum 8 characters'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                ></input>
              </div>
              <div className='column'>
                <label>Repeat Password*</label>
                <input
                  type='password'
                  name='repeat_password'
                  placeholder='Passwords must match'
                  onChange={e => setRepeatPassword(e.target.value)}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <div className='row top-margin'>
                <input
                    type='checkbox'
                    name='check'
                    placeholder='Passwords must match'
                    onChange={e => setChecked(!checked)}
                    value={checked}
                    required={true}
                  ></input>
                <div className='pad-left label'>I certify that I am 18 years of age or older, agree to the User Agreement, and acknowledge the Privacy Policy.*</div>
              </div>
              <button className="wide top-margin" type='submit'>Create free account</button>
            </form>
            <button className="wide top-margin" onClick={(e) => demoLogin(e)}>Demo</button>
            <div className='top-margin muted1'>Already have an account?<span> </span>
              <NavLink to='/login' className="link" exact={true}>
                Sign in
              </NavLink>
            </div>
          </div>
          </div>

        <div className='column signup-right center'>
          <h4>Get $1,000 in pseudo <br />money for setting up an <br />account today!
          <div className='muted1 top-margin'>Set up your account and verify to get started on trading <br />fake crypto. No Terms Apply</div>
          </h4>
          <img src={svg} alt="" height="240px" className='top-margin'></img>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
