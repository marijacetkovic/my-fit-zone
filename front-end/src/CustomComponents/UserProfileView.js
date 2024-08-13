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
      img: new FormData(),
      profilePicture: ""
    }
  }

  componentDidMount = () => {
    axios.get(API_URL+'/users/profile', { withCredentials: true })
        .then(response => {
            console.log(response.data);
            const profile = response.data[0]
            const picture = profile.img
            this.setState({
              userProfile: response.data[0],
              profilePicture: `${API_URL}/uploads/${picture}`
            })
        })
        .catch(err => {
            console.log(err);
            if(err.response.status===401){
                this.QSetHomeInParent();
                this.QSetViewInParent({page:"unauthorized"});
            }
        })
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
        this.toggleDialog()
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
    const profile = this.state.userProfile;
    console.log(profile)
    const user = this.props.user;
    return(<div style={{width:'65vw'}}>
      <div className='mt-5'>      
      <div className="card shadow-sm" style={{ borderRadius: '15px' }}>
  <div className="card-body p-4">
    <div className="text-center mb-3">
      {profile.img ? (
        <img
          src={this.state.profilePicture}
          className="rounded-circle"
          alt="User Avatar"
          style={{ width: '13vw', height: '13vw' }}
        />
      ) : (
        <img
          src="https://via.placeholder.com/100"
          className="rounded-circle"
          alt="User Avatar"
          style={{ width: '13vw', height: '13vw' }}
        />
      )}
    </div>
    <h5 className="card-title text-center mb-3">{user.name} {user.surname}</h5>
    <div className="container">
      <p className="card-text mb-2"><strong>Current streak:</strong> {profile.current_streak}</p>
      <p className="card-text mb-2"><strong>Longest Streak:</strong> {profile.max_streak}</p>
      <p className="card-text mb-2"><strong>Total Entries:</strong> {profile.total_entries}</p>
      <p className="card-text mb-2"><strong>Height:</strong> {profile.height} cm</p>
      <p className="card-text mb-2"><strong>Weight:</strong> {profile.weight} kg</p>
      <p className="card-text mb-2"><strong>Caloric intake:</strong> {profile.cal_intake} kcal</p>
    </div>
    <button className="btn btn-primary w-100 mt-3" onClick={this.toggleDialog}>Edit Profile</button>
  </div>
</div>

    </div>
        {
          this.state.showDialog?  (
            <div>
              <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5 text-black" id="exampleModalLabel">Edit Profile</h1>
        <button type="button" className="btn-close" aria-label="Close" onClick={this.toggleDialog}></button>
      </div>
      <div className="modal-body">
        <div className="row justify-content-center">
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="height" className="form-label text-black">Height</label>
                <input
                  type="number"
                  className="form-control"
                  name="height"
                  placeholder={profile.height}
                  onChange={(e) => this.QGetTextFromField(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="weight" className="form-label text-black">Weight</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  placeholder={profile.weight}
                  onChange={(e) => this.QGetTextFromField(e)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cal_intake" className="form-label text-black">Caloric Intake</label>
                <input
                  type="number"
                  className="form-control"
                  name="cal_intake"
                  placeholder={profile.cal_intake}
                  onChange={(e) => this.QGetTextFromField(e)}
                  requireds
                />
              </div>
              <div className="mb-3">
                <label htmlFor="img" className="form-label text-black">Profile Picture</label>
                <input
                  className="form-control"
                  type="file"
                  name="img"
                  onChange={(e) => this.saveImg(e)}
                  required
                />
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

</div>)   : ""
        }
</div>)
  }
}

export default UserProfileView