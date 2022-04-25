import React from 'react'
import  "./home.css";
import vectors from "../../assets/funcolors.png"

function home() {
  return (
    <div className="header_padding">
      <div className="header_content">
         <h1 className='gradient-text'>Welcome To Your Health Journal Website!</h1>
         <p>Start with loging in your health entery for today!</p>
      </div>
      <div className="header_img">
        <img src={vectors} alt="shapes"/>
      </div>
    </div>
  )
}

export default home