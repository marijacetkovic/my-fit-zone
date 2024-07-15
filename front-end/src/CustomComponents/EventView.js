import React from 'react'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class EventView extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            events:[]
        }
      }
      componentDidMount(){
        axios.get(API_URL+'/event/')
        .then(response => {
            console.log(response);
            this.setState({
                events:response.data
            })
        })
        .catch(err => {
            console.log(err);
        })
      }
  render()
  {
    const data = this.state.events;
    return(
    <div className='album py-5 bg-body-tertiary'>
        <div className='container'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {data.length>0 ? data.map((d) => {return(
            <div className="col">
             <div className="card shadow-sm" key={d.id}>
             <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
               <title>Placeholder</title>
               <rect width="100%" height="100%" fill="#55595c"></rect>
               <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
             </svg>
             <div className="card-body">
                 <h5>{d.name}</h5>
                 <h6 className='text-muted'>{d.organization}</h6>
               <p className="card-text">{d.description}</p>
               <div className="d-flex justify-content-between align-items-center">
                 <div className="btn-group">
                   <button type="button" className="btn btn-sm btn-outline-secondary">Sign Up</button>
                 </div>
                 <small className="text-body-secondary text-muted">{d.time}, {d.location}</small>
               </div>
             </div>
           </div>
           </div>
        )}) : "Loading..."}
     
                 </div>
            </div>
        </div>
    )
  }
}

export default EventView