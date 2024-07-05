import React from 'react'
import WorkoutCard from './WorkoutCard'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class AllWorkoutsView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            workouts:[]
        }
      }
      QSetHomeInParent = () => {
        this.props.QSetHomeFromChild();
    }
      QSetViewInParent = (obj) => {
        this.props.QIDFromChild(obj);
    }

    handleWorkoutDelete = (id) => {
        console.log("wk delete id "+id)
        axios.delete(`http://88.200.63.148:1046/workout/${id}`
            ,{withCredentials: true})
          .then(response=>{
            console.log("Sent to server...")
            console.log(response.status)
          })
          .catch(err=>{
            console.log(err)
            if(err.response.status===401){
              this.QSetHomeInParent();
              this.QSetViewInParent({page:"unauthorized"});
          }
          })
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
  render()
  {
    const data = this.state.workouts;
    return(
        <div className='row'>
            <div className='row col-10 col-sm-10 justify-content-center'>
            { data.length>0 ? 
            data.map((d)=> (
            <WorkoutCard workoutData={d} class="card col-10 col-sm-3 col-md-3 col-lg-3 mx-2 my-2" delete={true}
            handleDelete={this.handleWorkoutDelete}/>))
            : ""}
            </div>
            <div class="dropdown col-2 col-sm-2 mt-3 ms-4">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  </button>
  <div class="dropdown-menu mt-1" aria-labelledby="dropdownMenuButton" style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
        <div className="container">
                <h5>Add Workout</h5>
                <form>
                    <div className="form-group">
                    <label htmlFor="exerciseName">Workout Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="workoutName"
                        name="workoutName"
                        placeholder=""
                        required
                    />
                    </div>
                    <div className="form-group row">
                    <div className="col-md-12">
                            <label htmlFor="reps">Exercise 1</label>
                            <input
                            type="text"
                            className="form-control"
                            id="exercise"
                            name="exercise"
                            placeholder=""
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="sets">Sets</label>
                            <input
                            type="text"
                            className="form-control"
                            id="sets"
                            name="sets"
                            placeholder=""
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="reps">Reps</label>
                            <input
                            type="text"
                            className="form-control"
                            id="reps"
                            name="reps"
                            placeholder=""
                            />
                        </div>
                        </div>
                    <button type="submit" className="btn btn-primary mt-2">
                    Submit
                    </button>
                </form>
                </div>
        </div>
        </div>
        </div>
    )
  }
}

export default AllWorkoutsView