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
