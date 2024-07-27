import React from 'react'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class AllExercisesView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        update:false,
        exercises:[],
        activeTab: 'all',
        cardId:null
    }
  }
  componentDidMount(){
    axios.get(API_URL+'/exercise', { withCredentials: true })
    .then(response => {
        console.log(response);
        this.setState({
            exercises:response.data
        })
    })
    .catch(err => {
      if(err.response.status===401){
        this.QSetHomeInParent();
        this.QSetViewInParent({page:"unauthorized"});
    }
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
          var updatedExercises = this.state.exercises;
          updatedExercises = updatedExercises.filter(e=>e.id!==id);
          this.setState({exercises:updatedExercises})
        })
        .catch(err=>{
          console.log(err)
          if(err.response.status===401){
            this.QSetHomeInParent();
            this.QSetViewInParent({page:"unauthorized"});
        }
        })
    }

    toggleFavorite = (key, id, is_favorite) => {
      if (is_favorite===1){
        axios.delete(`http://88.200.63.148:1046/exercise/favorite/${id}`, { withCredentials: true })
        .then(response=>{
          console.log("Sent to server...")
          console.log(response.data)
          console.log("this state exercises")
          console.log(this.state.exercises)
          var updatedExercises = this.state.exercises;
          updatedExercises[key].is_favorite = 0;
          this.setState({ exercises: updatedExercises });
        })
        .catch(err=>{
          console.log(err)
          if(err.response.status===401){
            this.QSetHomeInParent();
            this.QSetViewInParent({page:"unauthorized"});
        }
        })
      }
      else{
        axios.post('http://88.200.63.148:1046/exercise/favorite',{
          exercise_id:id
        },  { withCredentials: true })
        .then(response=>{
          console.log("Sent to server...")
          console.log(response.data)
          var updatedExercises = this.state.exercises;
          updatedExercises[key].is_favorite = 1;
          this.setState({ exercises: updatedExercises });
        })
        .catch(err=>{
          console.log(err)
          if(err.response.status===401){
            this.QSetHomeInParent();
            this.QSetViewInParent({page:"unauthorized"});
        }
        })
      }
      
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
          })
          .catch(err=>{
            if(err.response.status===401){
              this.QSetHomeInParent();
              this.QSetViewInParent({page:"unauthorized"});
          }
          })
    }   
    toggleExpand = (id) => {
      console.log('toggling '+id)
      this.setState((prevState) => ({
        cardId: prevState.cardId === id ? null : id
      }));
    } 
    switchTab = (tab) => {
      this.setState({
        activeTab:tab
      })
      var query=""
      if(tab==='favorite') query="/favorite"
      axios.get(API_URL+'/exercise'+query, { withCredentials: true })
        .then(response => {
            var data = response.data.map(e=>{ 
              return tab==='all' ?  e : {...e, is_favorite:1} 
            })
            this.setState({
                exercises:data
            })
            console.log(data)
        })
        .catch(err => {
          if(err.response.status===401){
            this.QSetHomeInParent();
            this.QSetViewInParent({page:"unauthorized"});
        }
        })
    }
  render() {
    const data = this.state.exercises;
    const activeTab = this.state.activeTab;
    return(
      <div className='container'>
         <ul className="nav nav-tabs" style={{width:"80%"}}>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} onClick={() => this.switchTab('all')}>All Exercises</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => this.switchTab('favorite')}>Favorite Exercises</button>
            </li>
          </ul>
        <div className='row'>
            <div className='row col-10 col-sm-10 justify-content-center'>
            {data.length > 0 ?
                    data.map((d, id) => {            
                return (<div key={id} className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '0.5rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{d.category}</h6>
                <div>
      <button
        className="btn btn-primary"
        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
        onClick={() => {this.toggleExpand(d.id)}}
      >
        Explore
      </button>
      <div
        className={`collapse mt-3 ${this.state.cardId === d.id ? 'show' : ''}`}
      >
          <div>
            <strong>Description:</strong>
            <p>{d.description}</p>
          </div>
          <div>
            <strong>Video:</strong>
            <iframe
              width="100%"
              height="315"
              src={d.video_url}
              frameBorder="0"
              allowFullScreen
              title="Exercise Video"
            ></iframe>
        </div>
      </div>
    </div>
                                
                <svg onClick={()=>{this.handleDelete(d.id)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash mx-1" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                {
                  d.is_favorite===1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg"  onClick={()=>{this.toggleFavorite(id,d.id, d.is_favorite)}} width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
                  ) : (
                <svg onClick={()=>{this.toggleFavorite(id,d.id, d.is_favorite)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart mx-1" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              </svg>
                  )
                }
                
                </div>
                </div>)}) : "No exercises to display."}
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
        </div>
    )
  }
}

export default AllExercisesView