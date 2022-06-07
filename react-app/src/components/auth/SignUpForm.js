import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="Coinbase logo" viewBox="0 0 48 48" width="32" height="32" class="cds-iconStyles-iogjozt"><title>Coinbase logo</title><path d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z" fill="#0052FF"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="Coinbase logo" viewBox="0 0 48 48" width="32" height="32" class="cds-iconStyles-iogjozt"><title>Coinbase logo</title><path d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z" fill="red" ></path></svg>

      <h2>Create an account</h2>
      <div>Required fields have an asterisk: *</div>
      <div>
        <label>First name*</label>
        <input
          type='text'
          name='firstName'
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last name*</label>
        <input
          type='text'
          name='lastName'
          onChange={e => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email*</label>
        <input
          type='text'
          name='email'
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password*</label>
        <input
          type='password'
          name='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password*</label>
        <input
          type='password'
          name='repeat_password'
          onChange={e => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>I certify that I am 18 years of age or older, agree to the User Agreement, and acknowledge the Privacy Policy.</div>
      <button type='submit'>Create free account</button>
    </form>
  );
};

export default SignUpForm;
