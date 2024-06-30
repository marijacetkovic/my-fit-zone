import React from 'react'
import WorkoutCard from './WorkoutCard'
import DiaryDetailsCard from './DiaryDetailsCard'

class DiaryView extends React.Component
{
  render()
  {
   return(
    <div className='container'>
    <div className="col-9 col-sm-10">
      <div className="card shadow">
        <div className="card-header">
          <h5 className="card-title">Day at the Beach</h5>
          <h6 className="card-subtitle mb-2">June 30, 2024</h6>
        </div>
        <div className="card-body">
          <p className="card-text">It was a sunny day at the beach with friends. The waves were calm, and the sun was warm.</p>
          <div className="card-footer text-muted d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-primary">View</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
              <div className="dropend">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <div className="">
                    <WorkoutCard />
                  </div>
                </div>
              </div>
              <div className="dropend">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <div className="">
                    <DiaryDetailsCard />
                  </div>
                </div>
              </div>
            </div>
            <small>9 mins ago</small>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

export default DiaryView