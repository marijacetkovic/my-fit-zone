import React from 'react'

class UserProfileView extends React.Component
{
  render()
  {
    return(
    <div className='mt-5'>
        <div className="mx-auto card col-md-6">
        <div className="card-header bg-primary text-white">
            User Profile Details
        </div>
        <div className="card-body">
            <div className="text-center mb-3">
            <img src="https://via.placeholder.com/150" className="rounded-circle" alt="User Avatar" />
            </div>
            <h5 className="card-title text-center mb-3">John Doe</h5>
            <div className="d-flex justify-content-between mb-3">
            <p className="card-text">Height: 180 cm
            </p>
            <p className="card-text">Weight: 75 kg</p>
            </div>
            <p className="card-text">Daily Caloric Intake: 2000 kcal</p>
            <a href="#" className="btn btn-primary w-100">Edit Profile</a>
        </div>
    </div>

    </div>
    )
  }
}

export default UserProfileView