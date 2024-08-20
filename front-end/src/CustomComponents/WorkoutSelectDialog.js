import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";
import WorkoutCard from "./WorkoutCard";

class WorkoutSelectDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            workouts: [],
            exercise_id: ''
        }
        this.handleWorkoutSelect=this.handleWorkoutSelect.bind(this)
    }
    QSetHomeInParent = () => {
      this.props.QSetHomeFromChild();
  }
    QSetViewInParent = (obj) => {
      this.props.QIDFromChild(obj);
  }
    handleWorkoutSelect(id,name){
      console.log("id in dialog "+id)
        this.props.QWorkoutSelectDialog(id,name)      
    }

    componentDidMount(){
        axios.get(API_URL+'/workout/', { withCredentials: true })
        .then(response => {
            console.log(response.data);
            this.setState({
                workouts:response.data
            })
        })
        .catch(err => {
          if(err?.response?.status===401){
            this.QSetHomeInParent();
            this.QSetViewInParent({page:"unauthorized"});
        }
        })
      }  
    render(){
        const data = this.state.workouts;
        return(
        
            <div>
                 <div className="modal show" style={{ display: 'block' }}>
  <div className="modal-dialog modal-xl">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5 text-black" id="exampleModalLabel">Choose a workout</h1>
        <button onClick={this.props.onClose} type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
        </button>
      </div>
      <div className="modal-body">
      <div className='row justify-content-center'>
            { data.length>0 ? 
            data.map((d)=> (
            <WorkoutCard handleSelect={this.handleWorkoutSelect} 
            closeDialog={this.props.onClose}
            workoutData={d} cardClass="card col-10 col-sm-2 col-md-2 col-lg-2 mx-2 my-2"/>))
            : ""}
            </div>
      </div>
    </div>
  </div>
            </div>
            </div>
        )
    }
}

export default WorkoutSelectDialog;