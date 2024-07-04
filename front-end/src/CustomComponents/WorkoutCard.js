import React from 'react'

class WorkoutCard extends React.Component
{
  handleSelect= () => {
    console.log("manja")
    if(this.props.handleSelect){
       this.props.handleSelect(this.props.workoutData.workout.id)
    }
  }

  render()
  {
    console.log(this.props)
   // const data = []
    //const exercises = []
    const data = this.props.workoutData.workout || {};
    const exercises = this.props.workoutData.exercises || [];

    return(
        <div className={this.props.class} 
        onClick={this.handleSelect}
        style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="card-body">
          <h5 className="card-title">{data.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{data.date}</h6>
          <ul className="list-group list-group-flush">
            { exercises.length>0 ? exercises.map((e) => (
                <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{e.name}</h6>
                    <p>Sets: {e.sets}, Reps: {e.reps}</p>
                  </div>
                </div>
              </li>
            )) : ""}
          </ul>
        </div>
        </div>
    )
  }
}

export default WorkoutCard
