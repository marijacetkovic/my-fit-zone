import React from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";
import WorkoutCard from "./WorkoutCard";

class WorkoutSelectDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            workouts: []
        }
    }
    QSetHomeInParent = () => {
      this.props.QSetHomeFromChild();
  }
    QSetViewInParent = (obj) => {
      this.props.QIDFromChild(obj);
  }
    handleWorkoutSelect(id){
        console.log(id+"wk is chosen")
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
            console.log(err);
            if(err.response.status===401){
              this.QSetHomeInParent();
              this.QSetViewInParent({page:"unauthorized"});
          }
        })
      }  
    render(){
        const data = this.state.workouts;
        return(
            <div>
                 <div class="modal show" style={{ display: 'block' }}>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='row justify-content-center'>
            { data.length>0 ? 
            data.map((d)=> (
            <WorkoutCard handleSelect={this.handleWorkoutSelect} workoutData={d} class="card col-10 col-sm-2 col-md-2 col-lg-2 mx-2 my-2"/>))
            : ""}
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" onClick={()=>this.props.onClose()} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
            </div>
            </div>
        )
    }
}

export default WorkoutSelectDialog;