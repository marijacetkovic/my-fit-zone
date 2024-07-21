import React from 'react'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class UserProfileView extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      userProfile:{},
      showDialog: false,
      img: new FormData()
    }
  }

    saveImg(event){
      const data = new FormData();
      data.append('file', event.target.files[0]);
      this.setState({img:data})
      //console.log(this.state.img[0].name)
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
        console.log(this.state.userProfile)
        const {height, weight, cal_intake} = this.state.userProfile;
        const formData = this.state.img;
      const requestData = {
        height: height,
        weight: weight,
        cal_intake: cal_intake
      };
      formData.append('data', JSON.stringify(requestData));
      try {
        const response = axios.post(API_URL+'/users/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true 
        });

        console.log('Profile updated successfully:', response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }  
    toggleDialog = () => {
      this.setState(prev => ({
          showDialog: !prev.showDialog 
      }))
  }

  
  render()
  {
    const profile = this.state.profile;
    const user = this.props.user;
    return(<div style={{width:'65vw'}}>
      <div className='mt-5'>
        <div className="mx-auto card col-md-6">
        <div className="card-header text-white" style={{ backgroundColor: "#62b2a5" }}>  
        </div>
        <div className="card-body">
            <div className="text-center mb-3">
            <img src="https://via.placeholder.com/150" className="rounded-circle" alt="User Avatar" />
            </div>
            <h5 className="card-title text-center mb-3">{user.name} {user.surname}</h5>
            <div className="container mx-auto">
            <p className="card-text">Current streak: 0
            </p>
            <p className="card-text">Longest Streak: 0</p>
            <p className="card-text">Total Entries: 0</p>
            </div>
            <button className="btn btn-primary w-100 mt-2" onClick={this.toggleDialog}>Edit Profile</button>
        </div>
  
      </div>
    </div>
        {
          this.state.showDialog?  (
            <div>
<div class="modal show" style={{ display: 'block' }}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit profile</h1>
      </div>
      <div class="modal-body">
      <div className='row justify-content-center'>
             
      <div className="container">
          <form onSubmit={this.handleSubmit}>
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
    </div>
  </div>
            </div>
            </div>
          )   : ""
        }
</div>)
  }
}

export default UserProfileView