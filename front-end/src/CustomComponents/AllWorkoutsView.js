import React from 'react'
import WorkoutCard from './WorkoutCard'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class AllWorkoutsView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            workouts:[],
            exerciseInput:[
                {
                exercise_id:'',
                sets:'',
                reps:''
            }],
            exerciseData: [],
            showDialog:false,
            exerciseLimit:5,
            update:false
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
            var updatedWorkouts = this.state.workouts;
            updatedWorkouts = updatedWorkouts.filter(w=>w.workout.id!==id);
            this.setState({workouts:updatedWorkouts})          
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

        axios.get(API_URL+'/exercise/', { withCredentials: true })
        .then(response => {
            console.log(response.data);
            this.setState({
                exerciseData:response.data
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

    QGetTextFromField=(e,id)=>{
        let singleExerciseData = this.state.exerciseInput[id] //get single exercise entry
        let allExercisesData = this.state.exerciseInput;
        singleExerciseData = {...singleExerciseData,
            [e.target.name]:e.target.value
        }
        allExercisesData[id] = singleExerciseData
        this.setState({
            exerciseInput: allExercisesData
        })
        console.log(this.state.exerciseInput)
    }

    QRemoveField = (id) => {
        if(id!==0){
            console.log("emove id "+id)
            //keep all with id different than removed
            const temp = this.state.exerciseInput.filter((e, index) => index !== id);
            this.setState(prev => ({
                exerciseInput: temp,
                exerciseLimit: prev.exerciseLimit + 1
            }))
        }
    }
        
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://88.200.63.148:1046/workout/',{
            name:this.state.workoutName,
            exercises:this.state.exerciseInput
            },  { withCredentials: true })
            .then(response=>{
            console.log("Sent to server...")
            console.log(response.status)
            this.toggleDialog();
            this.setState({update:true});
            })
            .catch(err=>{
            console.log(err)
            })
    }  


    handleFormChange = (e) => {
        if(this.state.exerciseLimit!==0){
            this.setState( prev => ({
                exerciseInput: [...prev.exerciseInput, {
                    id: '',
                    sets: '',
                    reps: ''
                }],
                exerciseLimit: prev.exerciseLimit-1
            }))
        }
        else{
            console.log("cant add anymore")
        }
    }

    toggleDialog = () => {
        this.setState(prev => ({
            showDialog: !prev.showDialog 
        }))
    }

    QGetValueFromSelect = (e,id) => {
        console.log(e.target.value)
        let singleExerciseData = this.state.exerciseInput[id] //get single exercise entry
        let allExercisesData = this.state.exerciseInput;
        singleExerciseData = {...singleExerciseData,
           exercise_id:e.target.value}
        allExercisesData[id] = singleExerciseData
        this.setState({
            exerciseInput: allExercisesData
        })
        console.log(this.state.exerciseInput)
    }
  render()
  {
    const data = this.state.workouts;
    const exerciseInput = this.state.exerciseInput;
    const exerciseData = this.state.exerciseData;
    return(
        <div className='row'>
            <div className='row col-10 col-sm-10 justify-content-center'>
            { data.length>0 ? 
            data.map((d)=> (
            <WorkoutCard workoutData={d} class="card col-10 col-sm-3 col-md-3 col-lg-3 mx-2 my-2" delete={true}
            handleDelete={this.handleWorkoutDelete}/>))
            : "No workouts to display."}
            </div>
            <div class="dropdown col-2 col-sm-2 mt-3 ms-4">
  <button class="btn btn-secondary dropdown-toggle" type="button" onClick={this.toggleDialog}>
  </button>
        {
            this.state.showDialog ? (
                <div className="modal show" style={{ display: 'block' }}>
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Add Workout</h1>
                      <button type="button" className="btn-close" onClick={this.toggleDialog} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={this.handleSubmit}>
                        <div className="container">
                        <div className="form-group mb-2">
                    <label htmlFor="exerciseName">Workout Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="workoutName"
                        name="workoutName"
                        placeholder=""
                        required
                        onChange={(e)=>{
                          this.setState({
                            workoutName: e.target.value
                          })
                        }}
                    />
                    </div>
                          {exerciseInput.map((exercise, id) => (
                            <div key={id} className="mb-3">
                              <div className="row g-3">
                                <div className="col-md-5">
                                <select 
                                        className="form-select" 
                                        onChange={(event) => this.QGetValueFromSelect(event, id)}                                    >
                                        <option selected>Exercise {id+1}</option>
                                        {exerciseData.length > 0 ? (
                                        exerciseData.map((exercise) => (
                                            <option key={exercise.id} value={exercise.id}>
                                            {exercise.name}
                                            </option>
                                        ))
                                        )  : ""
                                    }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="sets"
                                    placeholder="Sets"
                                    value={exercise.sets}
                                    onChange={(e) => this.QGetTextFromField(e, id)}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="reps"
                                    placeholder="Reps"
                                    value={exercise.reps}
                                    required
                                    onChange={(e) => this.QGetTextFromField(e, id)}
                                  />
                                </div>
                                {
                                    id===0 ? "" : (<button type="button" className="btn btn-primary col-md-1" onClick={ () => {this.QRemoveField(id)}}>
                                    Remove
                                </button>)
                                }
                              </div>
                            </div>
                          ))}
                          <button type="button" className="btn btn-primary" onClick={this.handleFormChange}>
                            Add More
                          </button>
                          <button type="submit" className="btn btn-primary ms-2">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
                ) :""
        }

  
        </div>
        </div>
    )
  }
}

export default AllWorkoutsView