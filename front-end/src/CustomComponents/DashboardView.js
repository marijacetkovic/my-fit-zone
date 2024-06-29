import React from 'react'

class DashboardView extends React.Component
{
  render()
  {
    return(
    <div className="card" style={{margin:"10px"}}>
      <div className="card-body">
        <h5 className="card-title">Welcome!!!</h5>
        <p className="card-text">You are in the DashboardView</p>
      </div>
    </div> 
    )
  }
}

export default DashboardView