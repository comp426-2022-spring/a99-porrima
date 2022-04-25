import React, {useState} from 'react'

import './BMI.css'

function BMICal() {

  const [weight, Weight] = useState(0)
  const [height, Height] = useState(0)
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
 

  return (
    <div className="frame">
      <div className='box'>
        <h1>BMI Calculator</h1>
        <form onSubmit={calculator}>
          <div>
            <label>Enter your Weight (lbs)</label>
            <input value={weight} onChange={(e) => Weight(e.target.value)} />
          </div>
          <div>
            <label>Enter your Height (in)</label>
            <input value={height} onChange={(event) => Height(event.target.value)} />
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
}

export default BMICal;