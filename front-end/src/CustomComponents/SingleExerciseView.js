import React from 'react'

class SingleExerciseView extends React.Component
{
  render()
  {
    return(
        <div className='row'>
        <div className="card" style={{ width: '18rem', margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="card-body">
            <h5 className="card-title">Squats</h5>
            <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
            <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
        </div>
        </div>
    </div>
    )
  }
}

export default SingleExerciseView