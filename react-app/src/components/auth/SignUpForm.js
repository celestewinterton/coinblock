import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import svg from '../images/Signup.svg'
import './Auth.css'



const SignUpForm = () => {
  const [errors, setErrors] = useState({});
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
    setErrors({})
    // if (!checked) errors.push("You must be over 18 years of age to sign up for Coinblock")
    if (password !== repeatPassword) setErrors({password: "Please make sure password and confirmed password match"})
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      // console.log(data)
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
    return <Redirect to='/home' />;
  }

  return (
    <div className='signup-page-container'>
      <div className='row'>
        <div className='column signup-left'>
          <div>
            <form onSubmit={onSignUp}>
              <h5>Create an account</h5>
              <div className='top-margin'>
              </div>
              <div className='label'>Required fields have an asterisk: *</div>
              <div className='row top-margin'>
                <div className='column'>
                  <div className="form-errors top-margin">{errors.firstName ? <p><i class="fa-solid fa-triangle-exclamation"></i>{errors.firstName}</p> : <p className='top-margin'></p>}</div>
                  <label>First name*</label>
                  <input
                    className='firstName-input'
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    onChange={e => setFirstName(e.target.value)}
                    required={true}
                    value={firstName}
                  ></input>
                </div>
                <div className='column'>
                  <div className="form-errors top-margin">{errors.lastName ? <p><i class="fa-solid fa-triangle-exclamation"></i>{errors.lastName}</p> : <p className='top-margin'></p>}</div>
                  <label>Last name*</label>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    required={true}
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                  ></input>
                </div>
              </div>
              <div className='column'>
                <div className="form-errors top-margin">{errors.email ? <p><i class="fa-solid fa-triangle-exclamation"></i>{errors.email}</p> : null}</div>
                <label>Email*</label>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                  required={true}
                  value={email}
                ></input>
              </div>
              <div className='column'>
                <div className="form-errors top-margin">{errors.password ? <p><i class="fa-solid fa-triangle-exclamation"></i>{errors.password}</p> : null}</div>
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
                <div className='pad-left label center'>I certify that I am 18 years of age or older, agree to the nonexistant User Agreement, and acknowledge the Privacy Policy.*</div>
              </div>
              <button className="wide top-margin round" type='submit'>Create free account</button>
            </form>
            <button className="wide top-margin round muted-button" onClick={(e) => demoLogin(e)}>Try a demo</button>
            <div className='top-margin muted1'>Already have an account?<span> </span>
              <NavLink to='/login' className="link" exact={true}>
                Sign in
              </NavLink>
            </div>
          </div>
          </div>

        <div className='column signup-right center'>
          <h4>Get fake Bitcoin <br />for setting up an account</h4>
          <div className='muted1 top-margin'>Set up your account and verify to get started on trading fake crypto. No Terms Apply</div>
          <img src={svg} alt="" height="240px" className='top-margin'></img>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
