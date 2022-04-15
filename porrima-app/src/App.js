import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import Journal from "./components/Journal/journal";
import useToken from "./components/App/useToken";

function App() {
  const { token, setToken } = useToken()

  if(token === undefined) {
    return <Login setToken={setToken} />
  }

  return ( 
  <div className="wrapper">
    <h1>Health Journal</h1>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/journal" element={<Journal/>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
