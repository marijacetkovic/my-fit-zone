import React from 'react'

class DiaryDetailsCard extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
    <div className="card-body">
    <div className="">
        <div className="">
        <strong>Duration:</strong> 2 hours
        </div>
        <div className="">
        <strong>Calories Burned:</strong> 300 kcal
        </div>
        <div className="">
        <strong>Calories Consumed:</strong> 1500 kcal
        </div>
        <div className="">
        <strong>Hours Slept:</strong> 7 hours
        </div>
        <div className="">
        <strong>Water Intake:</strong> 1.5 liters
        </div>
    </div>
    </div>
  </div>
    )
  }
}

export default DiaryDetailsCard