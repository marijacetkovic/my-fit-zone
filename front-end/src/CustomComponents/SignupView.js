import React from 'react'
import axios from 'axios'
import { API_URL } from '../Utils/Configuration';

class SignupView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    QSetViewInParent = (obj) => {
        this.props.QIDFromChild(obj);
    }
    QGetTextFromField=(e)=>{
        this.setState(prevState=>({
            user:{...prevState.user,[e.target.name]:e.target.value}
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_URL+'users/register',{
            name:this.state.user.name,
            surname:this.state.user.surname,
            email:this.state.user.email,
            password:this.state.user.password
          })
          .then(response=>{
            if(response.status===200){
                this.QSetViewInParent({page:"login"});
            }
          })
          .catch(err=>{
            console.log(err)
          })
    }   
    render()
    {
        
      return(
          <div className='container form-signin col-md-4 mt-5'>
          <form onSubmit={this.handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" className="d-block mx-auto mb-4" width="72" height="57" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
                  </svg>
          <h1 className="h3 text-center mb-3 fw-normal">Join us!</h1>
      
          <div className="form-floating">
            <input type="text" required className="form-control mb-1" onChange={(e)=>this.QGetTextFromField(e)} name='name' id="name" placeholder="Name" />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating">
            <input type="text" required className="form-control mb-1" onChange={(e)=>this.QGetTextFromField(e)} name='surname' id="surname" placeholder="Surname" />
            <label htmlFor="surname">Surname</label>
          </div>
          <div className="form-floating">
            <input type="email" required className="form-control mb-1" onChange={(e)=>this.QGetTextFromField(e)} name='email' id="email" placeholder="name@example.com" />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" required className="form-control" onChange={(e)=>this.QGetTextFromField(e)} name='password' id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary w-100 mt-2 py-2" type="submit">Register</button>
          
          <p className="mt-5 mb-3 text-center text-body-secondary">© MyFitZone</p>
        </form>

        <button type="button" className="btn btn-secondary" onClick={() => this.QSetViewInParent({ page: 'home' })}        >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
      </svg>
      Back
    </button>
        </div>
      )
    }
}

export default SignupView