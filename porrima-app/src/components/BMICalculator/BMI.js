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
        RETURN('You are underweight!')
      } else if (bmi >= 24.9 && bmi < 30) {
        RETURN('You are normal weight. Keep it up!')
      } else {
        RETURN('You are overweight. Stay active!')
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
      <div className='box'>
      <h1>BMI Calculator</h1>
      <div className='content'>
        <div className='input'>
          <label for="height">Height (in)</label>
          <input type="number" id='height'></input>
        </div>
        <div className='input'>
          <label for="weight">Weight (lbs)</label>
          <input type="number" id='weight'></input>
        </div>
        <button id='calculate'>Calculate BMI</button>
      </div>
      <div className='result'>
        <p>
          Your BMI is
        </p>
        <div className='result'>00.00</div>
        <p className='comment'>Comment</p>
      </div>
      </div>
    </div>

  );
}

export default BMICal;