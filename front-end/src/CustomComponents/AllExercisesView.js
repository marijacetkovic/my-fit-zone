import React from 'react'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class AllExercisesView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        update:false,
        exercises:[]
    }
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
  QSetHomeInParent = () => {
    this.props.QSetHomeFromChild();
}
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
}  
  QGetTextFromField=(e)=>{
    this.setState(prevState=>({
        exercise:{...prevState.exercise,[e.target.name]:e.target.value}
    }))
    console.log(this.state)
    console.log(this.state.exercise)
  }

  handleDelete = (id) => {
      console.log("dekete id "+id)
      axios.delete(`http://88.200.63.148:1046/exercise/${id}`
          ,{withCredentials: true})
        .then(response=>{
          console.log("Sent to server...")
          console.log(response.status)
          this.setState({update:true})
        })
        .catch(err=>{
          console.log(err)
          if(err.response.status===401){
            this.QSetHomeInParent();
            this.QSetViewInParent({page:"unauthorized"});
        }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://88.200.63.148:1046/exercise/',{
            name:this.state.exercise.name,
            description:this.state.exercise.description,
            category:this.state.exercise.category
          },  { withCredentials: true })
          .then(response=>{
            console.log("Sent to server...")
            console.log(response.status)
            this.setState({update:true})
          })
          .catch(err=>{
            console.log(err)
          })
    }    
  render() {
    const data = this.state.exercises;
    return(
        <div className='row'>
            <div className='row col-10 col-sm-10 justify-content-center'>
            {data.length > 0 ?
                    data.map((d) => {            
                return (<div key={d.id} className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{d.category}</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                <svg onClick={()=>{this.handleDelete(d.id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                </div>
                </div>)}) : "Loading..."}
            </div>
            <div class="dropdown col-2 col-sm-2 mt-3 ms-4">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  </button>
  <div class="dropdown-menu dropdown-menu-left mt-1" aria-labelledby="dropdownMenuButton">
        <div className="container">
                <h5>Add Exercise</h5>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="exerciseName">Exercise Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exerciseName"
                        name="name"
                        placeholder="Enter exercise name"
                        onChange={(e)=>this.QGetTextFromField(e)}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        onChange={(e)=>this.QGetTextFromField(e)}
                        rows="3"
                        placeholder="Enter description"
                    ></textarea>
                    </div>
                    <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        onChange={(e)=>this.QGetTextFromField(e)}
                        placeholder="Enter category"
                    />
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

export default AllExercisesView