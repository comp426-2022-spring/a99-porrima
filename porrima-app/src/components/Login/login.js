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

    const token = await loginUser({
      username,
      password,
    });
    if (token.token) {
      window.location = "/home";
      setToken(token);
    }
  };

  function changeDiv() {
    const login = document.getElementById("login-container");
    login.classList.add("hidden");

    const signup = document.getElementById("signup-container");
    signup.classList.add("signup-container");
  }

  /*
return (
    <div className="login-page-wrapper">
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
*/

  return (
    <div className="loginwarpper">
      <div id="login-container" className="login_container">
        <div className="forms_container">
          <div className="signin_signup">
            <div className="signin_form">
              <h2 className="title">Log In</h2>
              <form onSubmit={handleSubmit}>
                <label className="input_field">
                  <input
                    placeholder="Username"
                    className="login-input"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </label>
                <label className="input_field">
                  <input
                    placeholder="Password"
                    className="login-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <div>
                  <button className="login-input" type="submit">
                    Submit
                  </button>
                  <div className="new-button">
                    <p className="new-member">New member? </p>
                    <button className="s-button" onClick={changeDiv}>Sign up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="signup-container" className="hidden">
        <div className="forms_container">
          <div className="signin_signup">
            <div className="signin_form">
              <h2 className="title">Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <label className="input_field">
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </label>
                <label className="input_field">
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </label>
                <label className="input_field">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <div>
                  <button type="submit">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
