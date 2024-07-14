import React from 'react'
import WorkoutCard from './WorkoutCard'
import DiaryDetailsCard from './DiaryDetailsCard'
import { API_URL } from '../Utils/Configuration';
import axios from 'axios';

class DiaryView extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      showDialog: false,
      workout:{
        name:''
      },
      workoutData:{},
      entries:{},
      img:new FormData()
    };
  }

  componentDidMount(){
    axios.get(API_URL+'/entry/', { withCredentials: true })
    .then(response => {
        console.log(response.data);
        this.setState({
            entries:response.data
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

  getWorkoutForEntry(id){
    console.log("get wk entry"+id)
    axios.get(API_URL+`/workout/details/${id}`, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            this.setState({
              workoutData:response.data
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
  render()
  {
    const entries = this.state.entries;
   return(
    <div className='container mt-2'>
    <div className="col-9 col-sm-10">
      {
        entries.length>0 ? entries.slice().reverse().map(e=>{
        return (
          <div className="card shadow mb-2">
        <div className="card-header">
          <h5 className="card-title fw-bold">{e.title}</h5>
          <h6 className="card-subtitle mb-2">{e.date.split('T')[0]}</h6>
        </div>
        <div className="card-body">
          <p className="card-text">{e.description}</p>
          <img src={`${API_URL}/uploads/${e.image}`} height={700} width={700}></img>
          <div className="card-footer text-muted d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-primary">View</button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
              <div className="dropend">
                <button  onClick={event=>{this.getWorkoutForEntry(e.workout_id)}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <div className="">
                    <WorkoutCard workoutData={this.state.workoutData} class="" delete={false}/>
                  </div>
                </div>
              </div>
              <div className="dropend">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <div className="">
                    <DiaryDetailsCard diaryDetails={e.diaryDetails}/>
                  </div>
                </div>
              </div>
            </div>
            <small></small>
          </div>
        </div>
      </div>
        )}
        )
      : "No entries to display."}
      
    </div>
  </div>
    )
  }
}

export default DiaryView