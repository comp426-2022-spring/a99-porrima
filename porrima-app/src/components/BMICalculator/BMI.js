import React, {useState} from 'react'

import './BMI.css'

function BMICal() {

  const [weight, Weight] = useState()
  const [height, Height] = useState()
  const [bmi, Bmi] = useState('')
  const [message, RETURN] = useState('')



  let calculator = (event) => {
    event.preventDefault()

  if (weight == 0 || height == 0) {
      alert('Invalid inputs')
    } else {
      let bmi = (weight / (height * height) * 703)
      Bmi(bmi.toFixed(1))

      if (bmi < 24.9) {
        RETURN('underweight!')
      } else if (bmi >= 24.9 && bmi < 30) {
        RETURN('normal weight.')
      } else {
        RETURN('overweight')
      }
    }
  }
 
/*
  return (
    <div className="frame">
      <div className='box'>
        <h1>BMI Calculator</h1>
        <form onSubmit={calculator}>
          <div className='weight'>
            <input value={weight}
            type="integer"
            placeholder="Enter your Weigh (lbs)"
            onChange={(e) => Weight(e.target.value)} />
          </div>
          <div className='bmi_height'>
            <input value={height} 
              placeholder="Enter your Height (in)"
            onChange={(event) => Height(event.target.value)} />
          </div>
          <div>
            <button type='submit'>Get Your BMI</button>
        
          </div>
        </form>

        <div className='middle'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

      </div>
    </div>
  );
  */

  return(
    <div className='wrapper'>
      <div className='container'>
      <div className='bmi_box'>
      <h1>BMI Calculator</h1>
      <form onSubmit={calculator}>
      <div className='bmi_content'>
        <div className='bmi_input'>
          <label for="height">Height (in)</label>
          <input 
          value={height}
          type="number" 
          id='height'
          onChange={(event) => Height(event.target.value)}
          ></input>
        </div>
        <div className='bmi_input'>
          <label for="weight">Weight (lbs)</label>
          <input 
          value={weight}
          type="number" 
          id='weight'
          onChange={(e) => Weight(e.target.value)}
          ></input>
        </div>
        <button type='submit' id='calculate'>Calculate BMI</button> 
      </div>
      </form>
      <div className='bmi_result'>
        <p>
          Your BMI is
        </p>
        <div id='bmi_result'>{bmi}</div>
        <p className='comment'>Comment: You are <span id="comment">{message}</span></p>
      </div>
      </div>
      </div>
    </div>

  );
}

export default BMICal;