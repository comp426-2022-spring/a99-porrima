import React from "react";
// import{ Rimenu3Line, RicloseLin} from 'react-icons/ri';
import './Navbar.css';
import logo from '../../assets/Health.png'


const signOut = async (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location = "/"
  // window.location.reload(false);
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

function goAccount() {
  window.location = "/account"
}

const navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar_links">
        
            <div className="navbar_logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="navbar_container">
              <p><a href="#home" onClick={goHome}>Home</a></p>
              <p><a href="#journal" onClick={goJournal}>Journal</a></p>
              <p><a href="#healthgoals" onClick={goHealthGoals}>Weekly Goals</a></p>
              <p><a href="#bmicalc" onClick={goBMICal}>BMI Calculator</a></p>
              <p><a href="#account" onClick={goAccount}>Account</a></p>
            </div>
        </div>
        <div className="navbar_logout">
          <button type="button" onClick={signOut}>Log Out</button>
        </div>
    </div>
  )
}

export default navbar