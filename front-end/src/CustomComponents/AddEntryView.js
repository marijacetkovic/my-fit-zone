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
      },
      entry:{},
      img:new FormData()
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


  QGetTextFromField=(e)=>{
    this.setState(prevState=>({
        entry:{...prevState.entry,[e.target.name]:e.target.value}
    }))
    console.log(this.state)
    console.log(this.state.entry)
  }


  QHandleWorkoutSelect = (id,workout_name) => {
    console.log("wk id from parent" +id+workout_name)
    this.setState({
      workout:{id:id,name:workout_name}
    })
  }
  saveImg(event){
    const data = new FormData();
    data.append('file', event.target.files[0]);
    this.setState({img:data})
  }

    handleSubmit = (e) => {
      e.preventDefault();
      const formData = this.state.img;

      const requestData = {
        title: this.state.entry.duration,
        duration: this.state.entry.duration,
        cal_burned: this.state.entry.cal_burned,
        cal_consumed: this.state.entry.cal_consumed,
        hours_slept: this.state.entry.hours_slept,
        water_intake: this.state.entry.water_intake,
        workout_id: this.state.workout.id,
        description: this.state.entry.description
      };
      formData.append('data', JSON.stringify(requestData));

      axios.post('http://88.200.63.148:1046/entry/',formData, {
          headers: {
            "content-type": "multipart/form-data"
          },
          withCredentials: true}        
          )
          .then(response=>{
          console.log("Sent to server...")
          console.log(response)
          
          })
          .catch(err=>{
          console.log(err)
          })
  }  
  render() {
    return (
      <div className="container mt-2">
        <div className="col-9 col-sm-10">
          <div className="card shadow">
            <form onSubmit={this.handleSubmit}>
              <div className="card-header">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  style={{ fontWeight: 'bold', fontSize: '1.25rem' }}
                  required
                  placeholder='Title'
                  onChange={this.QGetTextFromField}
                />
                <input
                  type="date"
                  className="form-control mt-2"
                  name="subtitle"
                  value={new Date().toISOString().split('T')[0]}
                  disabled
                />
              </div>
              <div className="card-body">
                <textarea
                  className="form-control"
                  name="description"
                  rows="8"
                  required
                  onChange={this.QGetTextFromField}

                  placeholder="Tell us about your daily activity."
                ></textarea>
                <div className="mt-3">
                  <div className="row row-cols-md-auto g-3">
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                        min="0" 
                        placeholder="Duration (minutes)"
                        required
                        onChange={this.QGetTextFromField}

                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_burned"
                        min="0" 
                        placeholder="Calories Burned"
                        required
                        onChange={this.QGetTextFromField}

                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_consumed"
                        min="0" 
                        placeholder="Calories Consumed"
                        required
                        onChange={this.QGetTextFromField}

                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="hours_slept"
                        onChange={this.QGetTextFromField}
                        min="0" 
                        placeholder="Hours Slept"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="number"
                        className="form-control"
                        name="water_intake"
                        min="0" 
                        placeholder="Water Intake (ml)"
                        required
                        onChange={this.QGetTextFromField}

                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        placeholder="Image"
                        onChange={(e) => this.saveImg(e)} 
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
