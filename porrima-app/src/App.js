import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import Journal from "./components/Journal/journal";
import useToken from "./components/App/useToken";
import HealthGoal from "./components/HealthGoals/goals";
import BMICal from "./components/BMICalculator/BMI";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { token, setToken } = useToken();

  if (token === undefined) {
    return <Login setToken={setToken} />;
  }

  return (
    
    <div className="App">
      <div className="gradient_bg">
        <Navbar/>
      </div>
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
