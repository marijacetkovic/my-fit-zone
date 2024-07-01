import React, { Component } from 'react';
import WorkoutCard from './WorkoutCard';
import DiaryDetailsCard from './DiaryDetailsCard';

class DiaryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
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
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                       
                        placeholder="Duration (minutes)"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_burned"
                        
                        placeholder="Calories Burned"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="cal_consumed"
                        
                        placeholder="Calories Consumed"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="hours_slept"
                        
                       
                        placeholder="Hours Slept"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control"
                        name="water_intake"
                        
                        placeholder="Water Intake (ml)"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="image"
                        
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                       
                        placeholder="Description"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        name="workout_id"
                       
                        placeholder="Workout ID"
                      />
                    </div>
                    <div className="col">
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DiaryView;
