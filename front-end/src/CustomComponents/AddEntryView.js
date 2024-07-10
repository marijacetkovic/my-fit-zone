import React, { Component } from 'react';
import WorkoutCard from './WorkoutCard';
import DiaryDetailsCard from './DiaryDetailsCard';
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';
import WorkoutSelectDialog from './WorkoutSelectDialog';

class AddEntryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      showDialog: false,
      workout:{
        name:''
      }
    };
  }
  QSetHomeInParent = () => {
    this.props.QSetHomeFromChild();
  }
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  }
  componentDidMount(){
    axios.get(API_URL+'/exercise/', { withCredentials: true })
    .then(response => {
        console.log(response);
        this.setState({
            exercises:response.data
        })
    })
    .catch(err => {
        console.log(err);
    })
  }

  QHandleWorkoutSelect = (id,workout_name) => {
    console.log("wk id from parent" +id+workout_name)
    this.setState({
      workout:{name:workout_name}
    })
  }

  render() {
    const data = this.state.exercises;
    return (
      <div className="container mt-2">
        <div className="col-9 col-sm-10">
          <div className="card shadow">
            <form>
              <div className="card-header">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                  required
                />
                <input
                  type="date"
                  className="form-control mt-2"
                  name="subtitle"
                  required
                />
              </div>
              <div className="card-body">
                <textarea
                  className="form-control"
                  name="text"
                  rows="3"
                  required
                ></textarea>
                <div className="mt-3">
                  <div className="row row-cols-md-auto g-3">
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                       
                        placeholder="Duration (minutes)"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_burned"
                        
                        placeholder="Calories Burned"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_consumed"
                        
                        placeholder="Calories Consumed"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="hours_slept"
                        
                       
                        placeholder="Hours Slept"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="water_intake"
                        
                        placeholder="Water Intake (ml)"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="image"
                        
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="workout_id"
                        value={this.state.workout.name}
                        placeholder="Workout"
                        readOnly
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="event_id"
                        
                        placeholder="Event ID"
                      />
                    </div>
    
                  </div>
                </div>
                </div>
              <div className="card-footer text-right">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button type="button" class="btn btn-primary" onClick={()=>{this.setState({showDialog:true})}}>
                Add Workout
                </button>
              </div>
             
            </form>
            { this.state.showDialog ? <WorkoutSelectDialog onClose={() => this.setState({showDialog:false})} 
               QSetHomeFromChild={this.QSetHomeInParent} QIDFromChild={this.QSetViewInParent}
               QWorkoutSelectDialog={this.QHandleWorkoutSelect}
              /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default AddEntryView;
