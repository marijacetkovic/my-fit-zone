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
        if(err?.response?.status===401){
          this.QSetHomeInParent();
          this.QSetViewInParent({page:"unauthorized"});
      }
    })
  }
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  } 
  QSetHomeInParent = () => {
    this.props.QSetHomeFromChild();
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
            //console.log(err);
            if(err?.response?.status===401){
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
        entries.length>0 ? entries.slice().reverse().map((e,id)=>{
        return (
          <div key={id} className="card shadow mb-2">
        <div className="card-header diaryCardHeader">
          <h5 className="card-title fw-bold">{e.title}</h5>
          <h6 className="card-subtitle mb-2">{e.date.split('T')[0]}</h6>
        </div>
        <div className="card-body">
          <p className="card-text">{e.description}</p>
          {e.image ? (
          <img src={`${API_URL}/uploads/${e.image}`} style={{maxHeight:'700px', maxWidth:'700px'}}
          className='mb-2'></img>) : ""}
          <div className="card-footer text-muted d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <div className="dropend">
                <button  onClick={event=>{this.getWorkoutForEntry(e.workout_id)}} className="btn btn-secondary mx-0 me-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" className="bi wk-icon" width="20" height="20" role="img"  viewBox="0 0 640 512">
                <path fill="#ffffff" d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/></svg>
                
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <div className="">
                    <WorkoutCard workoutData={this.state.workoutData} class="" delete={false}/>
                  </div>
                </div>
              </div>
              <div className="dropend">
                <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
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
      : 
      <div style={{color:"white", textAlign:"center"}}>No entries to display. You can start by adding your first diary entry.</div>}
      
    </div>
  </div>
    )
  }
}

export default DiaryView