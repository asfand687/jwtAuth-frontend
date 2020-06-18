import React, { Fragment, useState, useEffect } from 'react';
import {toast} from 'react-toastify';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success("Logged Out Successfully");
  }
  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });
      const parsedRes = await response.json();
      setName(parsedRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  },[]);

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <p>Welcome {name}</p>
      <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
