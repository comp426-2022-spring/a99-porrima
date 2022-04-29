import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";
import picture from "../../assets/health.JPG";

async function loginUser(credentials) {
  try {
    const url = "http://localhost:3000/app/user/signin/";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  } catch (e) {
    console.error(e);
  }
}

async function signUpUser(userData) {
  const url = "http://localhost:3000/app/new/user/";
  try {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((data) => data.json());
  } catch (e) {
    console.error(e);
  }
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    if (token.token) {
      window.location = "/home";
      setToken(token);
    }
  };

  const [email, setNewEmail] = useState();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const userData = await signUpUser({
      email,
      username,
      password,
    });
    console.log(userData);

    const token = await loginUser({
      username,
      password,
    });
    if (token.token) {
      setToken(token);
    }
  };

  /*const sign_in_btn = document.querySelector('#sign-in-btn');
  const sign_up_btn = document.querySelector('#sign-up-btn');
  const container = document.querySelector('.container');

  sign_up_btn.addEventListener('click', ()=> {
    container.classList.add('sign-up-mode');
  })

  sign_in_btn.addEventListener('click', ()=> {
    container.classList.remove('sign-up-mode');
  })*/

  return (
    <html lang="en">
    <head>
      <meta charset="UTF-8"></meta>
      <meta http-equiv="X-UA-Compatible" conten="IE=edge"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <title>Login and Signup</title>
    </head>
    <body>
      <div class="container">
        <div class="forms-container">
          <div class="login-signup">
            <form action="#" class="login-form" onSubmit={handleSubmit}>
              <h2 class="title">Log In</h2>
              <div class="input-field">
                <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div class="input-field">
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <input type="submit" class="btn solid" value="Login" />
            </form>
          </div>
          <div class="login-signup">
            <form action="#" class="sign-up-form" onSubmit={handleSignUp}>
              <h2 class="title">Sign Up</h2>
              <div class="input-field">
                <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div class="input-field">
                <input type="email" placeholder="Email" onChange={(e) => setNewEmail(e.target.value)}/>
              </div>
              <div class="input-field">

                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <input type="submit" class="btn solid" value="Login" />
            </form>
          </div>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New Here?</h3>
              <button class="btn transparent" id="sign-up-button">Sign Up</button>
            </div>
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us</h3>
              <button class="btn transparent" id="sign-in-button">Log In</button>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};