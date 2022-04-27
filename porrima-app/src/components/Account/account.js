import React, { useEffect } from "react";
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
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default Account;
