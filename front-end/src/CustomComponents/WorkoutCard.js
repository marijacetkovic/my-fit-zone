import React from 'react'

class WorkoutCard extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.workoutData?.workout?.id || 0,
      name: this.props.workoutData?.workout?.name
    }
  }
  handleSelect = () => {
    console.log("manja")
    if(this.props.handleSelect){
       this.props.handleSelect(this.state.id, this.state.name)
       if(this.props.closeDialog){
        this.props.closeDialog()
      }
    }
  }
  handleDelete = () => {
    console.log("deleting from workout card")
    if(this.props.handleDelete){
       this.props.handleDelete(this.state.id)
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
          <h5 className="card-title fw-bold text-black">{data.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{data.date?.split('T')[0]}</h6>
          <ul className="list-group list-group-flush">
            { exercises.length>0 ? exercises.map((e) => (
                <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className='fw-bold'>{e.name}</h6>
                    <p>Sets: {e.sets}, Reps: {e.reps}</p>
                  </div>
                </div>
              </li>
            )) : "No workout to display."}
          </ul>
          {this.props.delete? (<svg onClick={this.handleDelete} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>) : ""}
        </div>
        </div>
    )
  }
}

export default WorkoutCard
