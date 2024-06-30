import React from 'react'

class DiaryView extends React.Component
{
  render()
  {
    return(<div className='container'>
       <div class="col-9 col-sm-10">
        <div class="card shadow">
          <div class="card-header">
            <h5 class="card-title">Day at the Beach</h5>
            <h6 class="card-subtitle mb-2">June 30, 2024</h6>
          </div>
          <div class="card-body">
            <p class="card-text">It was a sunny day at the beach with friends. The waves were calm, and the sun was warm.</p>
            <div class="workout-card">
              <img src="https://via.placeholder.com/300x180" class="workout-card-img" alt="Workout Image" />
              <div class="workout-card-body">
                <h5 class="workout-card-title">Workout Details</h5>
                <p class="workout-card-text"><strong>Exercise:</strong> Squats</p>
                <p class="workout-card-text"><strong>Sets:</strong> 3</p>
                <p class="workout-card-text"><strong>Reps:</strong> 12</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-primary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
            </div>
            <small>9 mins ago</small>
          </div>
        </div>
      </div>

      </div> 
    )
  }
}

export default DiaryView