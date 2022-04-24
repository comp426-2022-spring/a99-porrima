import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import Journal from "./components/Journal/journal";
import useToken from "./components/App/useToken";

function App() {
  const { token, setToken } = useToken();

  if (token === undefined) {
    return <Login setToken={setToken} />;
  }

  const signOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload(false);
  };

  function goHome() {
    window.location = "/home";
  };

  function goJournal() {
    window.location = "/journal";
  };

  return (
    
    <div className="wrapper">
      <img src="logo.png" alt="logo"></img>
      <div class="header">
      
      <div class="container">
      
      <h1>The Health Journal</h1>
      <div class="signout">
        <button onClick={signOut}>Log Out</button>
      </div>
      
      </div>
        
        
        
      <hr></hr>
      </div>
      
      
      <nav>
        <button onClick={goHome}>Home</button>
        <button onClick={goJournal}>Journal</button>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
