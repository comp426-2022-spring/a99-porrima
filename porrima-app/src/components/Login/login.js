import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";
import "./IMG_6014.JPG";

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

  return (
    <div className="login-page-wrapper">
      <table>
        <tablebody>
          <tr>
            <td>
              <div class="logo">
                <h1>
                  <img src= "./IMG_6014.JPG"></img>
                  Welcome to The Health Journal
                </h1>
              </div>
            </td>
          </tr>
        </tablebody>
      </table>
      <table>
        <tablebody>
          <tr>
          <td class="box">
            <td>
              <div className="login-wrapper">
                <h2>Returning Users</h2>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                  <label>
                    <p>Username</p>
                    <input
                      className="login-input"
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Password</p>
                    <input
                      className="login-input"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <div>
                    <button className="login-input" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </td>
            </td>
            <td class="box">
            <td>
              <div className="signup-wrapper">
                <h1>First-Time Users</h1>
                <h2>Sign-up for The Health Journal!</h2>
                <form onSubmit={handleSignUp}>
                  <label>
                    <p>Email</p>
                    <input
                      className="signup-input"
                      type="text"
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Username</p>
                    <input
                      className="signup-input"
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                  <label>
                    <p>Password</p>
                    <input
                      className="signup-input"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                  <div>
                    <button className="signup-input" type="submit">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </td>
            </td>
          </tr>
        </tablebody>
      </table>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
