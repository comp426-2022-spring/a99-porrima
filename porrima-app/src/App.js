import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import Journal from "./components/Journal/journal";
import useToken from "./components/App/useToken";
import HealthGoal from "./components/HealthGoals/goals";
import BMICal from "./components/BMICalculator/BMI";

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

  function goHealthGoals() {
    window.location = "/healthgoals";
  };

  function goBMICal(){
    window.location = "/BMI"
  }

  return (
    <div className="wrapper">
      <div class="header">
        <h1>The Health Journal</h1>
      </div>
      
      <button onClick={signOut}>Log Out</button>
      <nav>
        <button onClick={goHome}>Home</button>
        <button onClick={goJournal}>Journal</button>
        <button onClick={goHealthGoals}>Weekly Goals</button>
        <button onClick={goBMICal}>BMI Calculator</button>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/healthgoals" element={<HealthGoal />} />
          <Route path="/BMI" element={<BMICal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
