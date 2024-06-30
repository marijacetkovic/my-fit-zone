import React from 'react'

class WorkoutCard extends React.Component
{
    //col-10 col-sm-3 col-md-3 col-lg-3 mx-2 my-2 --pass as props
  render()
  {
    return(
        <div className="card" style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="card-body">
          <h5 className="card-title">Squats</h5>
          <h6 className="card-subtitle mb-2 text-muted">June 29, 2024</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>Exercise 1</h6>
                  <p>Sets: 3, Reps: 10</p>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>Exercise 2</h6>
                  <p>Sets: 4, Reps: 12</p>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6>Exercise 3</h6>
                  <p>Sets: 3, Reps: 15</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        </div>
    )
  }
}

export default WorkoutCard
