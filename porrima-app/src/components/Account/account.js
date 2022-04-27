import React, { useEffect, useState } from "react";
import "./account.css";

function Account() {
  function deleteAccount() {
    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    const url = "http://localhost:3000/app/delete/user/";
    const userData = { username: username };
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((data) => data.json());

    localStorage.clear();
    window.location = "/";
  }

  const [newusername, setUsername] = useState();
  const [email, setEmail] = useState();

  function updateAccount(userData) {
    try{
      const url = "http://localhost:3000/app/update/user/"
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then((data) => data.json())
    } catch (e) {
      console.error(e)
    }
  }

  function handleSubmit() {
    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    const userData = {
      username,
      newusername,
      email
    }
    updateAccount(userData)
    const e = email || data.email;
    const u = newusername || username;
    localStorage.clear()
    const token = {token: true, user: u, email: e}
    localStorage.setItem("token", JSON.stringify(token))
    console.log(userData)
  }

  function FillInfo() {
    const data = JSON.parse(localStorage.getItem("token"));
    const user = data.user;
    const em = data.email;

    const username = document.getElementById("username");
    username.classList.add("info");
    username.innerHTML = user;
    const email = document.getElementById("email");
    email.innerHTML = em;
    email.classList.add("info");
  }

  useEffect(() => {
    FillInfo();
  }, []);

  return (
    <div className="account-wrapper">
      <h2>Username</h2>
      <div id="username" className="username"></div>
      <h2>Email</h2>
      <div id="email" className="email"></div>
      <div className="delete-button">
        <button className="d-button"onClick={deleteAccount}>Delete Account</button>
      </div>
      <div className="update-info">
        <h2>Update Account Info</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <p>Email</p>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <div className="update">
            <button className="update-button" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
