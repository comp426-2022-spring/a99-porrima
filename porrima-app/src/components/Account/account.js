import React, { useEffect } from "react";
import "./account.css";

function Account() {
  function deleteAccount() {
    const data = JSON.parse(localStorage.getItem("token"));
    const username = data.user;
    const url = "http://localhost:3000/app/delete/user/";
    const userData = { username: username }
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
    username.classList.add("")
    username.innerHTML = user;
    const email = document.getElementById("email");
    email.innerHTML = em;
    email.classList.add("")
  }

  useEffect(() => {
    FillInfo();
  }, []);

  return (
    <div className="account-wrapper">
      <div id="username" className="username"></div>
      <div id="email" className="email"></div>
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  );
}

export default Account;
