import React, { useState } from "react";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  try{
    return fetch('http://localhost:3000/app/user/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
  } catch (e) {
    console.error(e)
  }
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSumbit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if(token.token){
      setToken(token)
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form onSubmit={handleSumbit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}