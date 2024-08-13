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
      showResponse:false,
      showInspoDialog:false,
      workout:{
        name:''
      },
      entry:{},
      img:new FormData(),
      prompts:[],
      textareaPlaceholder: "Tell us about your daily activity.",
      response:{
        title:"",
        message:""
      }
    };
   
  }

  toggleResponseDialog = () => {
    this.setState(prev => ({
      showResponse: !prev.showResponse 
    }))
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
        //console.log(err);
    })

    // initialize tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltipTriggerEl => {
        new window.bootstrap.Tooltip(tooltipTriggerEl, {
          trigger: 'hover' 
        });
    });

    this.setState({
      prompts: this.getJournalPrompts()
    })

  } 
  getJournalPrompts = () => {
    return [
      "I'm grateful for…",
      "I felt most challenged by…",
      "I would like to improve on…",
      "An activity that inspires me is…",
      "My goal for this activity is…"
    ]
  }
  handlePromptClick = (id) => {
    this.setState({
      textareaPlaceholder:this.state.prompts[id],
      showInspoDialog:false
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

  removeWorkout = () => {
    console.log("manja")
    this.setState({
      workout:{id:null,name:""}
    })
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
          
          if(response.status===200){
            this.QSetViewInParent({page:"diary"});
          }

          })
          .catch(err=>{
          //console.log(err)
          if(err?.response?.status===401){
            this.QSetHomeInParent();
            this.QSetViewInParent({page:"unauthorized"});
        }
          else if(err?.response?.status===400){
            alert("You have already entered the daily entry.")
          }

          })
  }  
  render() {
    const prompts = this.state.prompts;
    //console.log(prompts)
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
                  maxLength={255}
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
                  maxLength={65535} 
                  placeholder={this.state.textareaPlaceholder}
                ></textarea>
                <div className="mt-3">
                  <div className="row row-cols-md-auto g-3">
                    <div className="col-12 formDiv">
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                        min="0" 
                        max="1440"
                        placeholder="Duration (minutes)"
                        required
                        onChange={this.QGetTextFromField}

                      />
                    </div>
                    <div className="col-12 formDiv">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_burned"
                        min="0" 
                        max="50000"
                        placeholder="Calories Burned"
                        required
                        onChange={this.QGetTextFromField}

                      />
                    </div>
                    <div className="col-12 formDiv">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_consumed"
                        min="0" 
                        max="50000"
                        placeholder="Calories Consumed"
                        required
                        onChange={this.QGetTextFromField}

                      />
                    </div>
                    <div className="col-12 formDiv">
                      <input
                        type="number"
                        className="form-control"
                        name="hours_slept"
                        max="99.99"
                        onChange={this.QGetTextFromField}
                        min="0" 
                        
                        placeholder="Hours Slept"
                        required
                      />
                    </div>
                    <div className="col-12 formDiv">
                      <input
                        type="number"
                        className="form-control"
                        name="water_intake"
                        min="0" 
                        placeholder="Water Intake (ml)"
                        required
                        onChange={this.QGetTextFromField}
                        max="999.99"
                      />
                    </div>
                    <div className="col-12 formDiv">
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        placeholder="Image"
                        onChange={(e) => this.saveImg(e)} 
                        />
                    </div>
                    <div className="col-12 formDiv" style={{ position: 'relative', display: 'inline-block' }}>
                        <input
                          type="text"
                          className="form-control"
                          name="workout_id"
                          value={this.state.workout.name}
                          placeholder="Workout"
                          readOnly
                        />
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="22" 
                          height="22" 
                          fill="#808080" 
                          className="bi bi-x"
                          viewBox="0 0 16 16" 
                          style={{
                            position: 'absolute',
                            top: '55%',
                            right: '1vw',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer'
                          }}
                          onClick={this.removeWorkout} 
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                      </div>

    
                  </div>
                </div>
                </div>
              <div className="card-footer text-right">
              <button className="btn btn-primary me-2" onClick={()=>{this.setState({showInspoDialog:true})}} data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Get inspired" title="Inspiration">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
              <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
               </svg>
                </button>
                {
                  this.state.showInspoDialog ? (
                    <div class="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Journal Prompts</h1>
                            <button type="button" class="btn-close" aria-label="Close" onClick={() => this.setState({ showInspoDialog: false })}></button>
                          </div>
                          <div class="modal-body">
                            <ul className="list-group list-group-flush">
                              {prompts.length>0 ? prompts.map((p,id)=>
                              {
                                return <li key={id} onClick={()=>{this.handlePromptClick(id)}} 
                                className="list-group-item small">{p}</li>
                              }
                              ) : ""}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : ""
                }
                <button type="submit" className="btn btn-primary me-2"  data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Save" title="Save" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
                  <path d="M11 2H9v3h2z"/>
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
                </svg>
                </button>
                <button type="button" class="btn btn-primary" onClick={()=>{this.setState({showDialog:true})}}  data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Add Workout" title="Add Workout" >
                <svg xmlns="http://www.w3.org/2000/svg" className="bi wk-icon" width="20" height="20" role="img"  viewBox="0 0 640 512">
                <path fill="#ffffff" d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/></svg>
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
