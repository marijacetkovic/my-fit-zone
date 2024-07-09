import React from 'react'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class UserProfileView extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      profile:true,
      userProfile:{}
    }
  }

  saveImg(event){
    const data = new FormData() ;
    data.append('file', event.target.files[0]);
    this.setState({img:data})
    console.log(this.state.img)
  }

  QGetTextFromField=(e)=>{
    this.setState(prevState=>({
        userProfile:{...prevState.userProfile,[e.target.name]:e.target.value}
    }))
    console.log(this.state)
    console.log(this.state.userProfile)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://88.200.63.148:1046/exercise/',{
            height:this.state.userProfile.height,
            weight:this.state.userProfile.weight,
            cal_intake:this.state.userProfile.calintake,
            img:this.state.img
          },  { withCredentials: true })
          .then(response=>{
            console.log("Sent to server...")
            console.log(response.status)
            this.setState({update:true})
          })
          .catch(err=>{
            console.log(err)
          })
    }  

  render()
  {
    const profile = this.state.profile;
    return(<div>
      {profile ? (<div className='mt-5'>
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

    </div>) : 
    (<div className='container d-flex justify-content-center align-items-center' style={{ height: '33vh'}}>
      <div className="dropdown">
        <button className="btn btn-secondary mt-3" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Add profile
        </button>
        <div className="dropdown-menu mt-1 me-5 p-4" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="height">Height</label>
              <input
                type="number"
                className="form-control"
                name="height"
                placeholder=""
                onChange={(e) => this.QGetTextFromField(e)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="weight">Weight</label>
              <input
                type="number"
                className="form-control"
                name="weight"
                placeholder=""
                onChange={(e) => this.QGetTextFromField(e)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="calintake">Caloric intake</label>
              <input
                type="number"
                className="form-control"
                name="calintake"
                placeholder=""
                onChange={(e) => this.QGetTextFromField(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img" className="form-label">Profile picture</label>
              <input className="form-control" 
                     type="file" 
                     name="img" 
                     onChange={(e) => this.saveImg(e)} />
            </div>
            <button type="submit" className="btn btn-primary mt-2 w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    )}
    
</div>)
  }
}

export default UserProfileView