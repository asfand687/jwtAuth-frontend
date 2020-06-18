import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'post',
        headers: { 'content-type': 'Application/json' },
        body: JSON.stringify(body),
      });

      const parsedRes = await response.json();
      if(parsedRes.token) {
        localStorage.setItem('token', parsedRes.token);
        setAuth(true);
        toast.success('Logged In Successfully');
      } else {
        setAuth(false);
        toast.error(parsedRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='py-5 text-center'>Login</h1>
      <from>
        <input
          type='email'
          name='email'
          placeholder='Email'
          className='form-control my-3'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='form-control my-3'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className='btn btn-success btn-block' onClick={onSubmitForm}>
          Login
        </button>
      </from>
      <Link to='/register'>Register</Link>
    </Fragment>
  );
};

export default Login;
