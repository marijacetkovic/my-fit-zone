import React from 'react'
import axios from 'axios';
import { API_URL } from '../Utils/Configuration';

class EventView extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            events:[],
            eventImages : [
              'https://yoganowchicago.com/wp-content/uploads/2021/06/beginners-yoga-class-BUQX8HA.jpg',
              'https://wpamelia.com/wp-content/uploads/2021/09/launch.jpg',
              'https://media.wired.com/photos/5cae8365eaad993a02ff5d1c/master/pass/bostonmarathon-947031426.jpg',
              'https://treeoflifenutrition.com.au/wp-content/uploads/2024/02/workplace-or-corporate-nutrition-seminars.jpg',
              'https://cdn.outsideonline.com/wp-content/uploads/2017/08/08/amateur-cyclists-mt-evans-colorado_s.jpg'
              ]
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
            //console.log(err);
        })
      }
  render()
  {
    const data = this.state.events;
    return(
    <div className='album py-5 bg-body-tertiary me-5'>
        <div className='container'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {data.length>0 ? data.map((d,id) => {return(
            <div className="col">
             <div className="card shadow-sm" key={d.id}>
             <img src={this.state.eventImages[id]} className="card-img-top" 
              style={{ width: '100%', height: '225px', objectFit: 'cover' }} />
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