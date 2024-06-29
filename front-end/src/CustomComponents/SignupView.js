import React from 'react'

class SignupView extends React.Component
{
    render()
    {
      return(
          <div className='container form-signin col-md-4 mt-5'>
          <form>
          <svg xmlns="http://www.w3.org/2000/svg" className="d-block mx-auto mb-4" width="72" height="57" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
                  </svg>
          <h1 className="h3 text-center mb-3 fw-normal">Join us!</h1>
      
          <div className="form-floating">
            <input type="email" className="form-control mb-1" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control mb-1" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Surname</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control mb-1" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
        
          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          
          <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
          
          <p className="mt-5 mb-3 text-center text-body-secondary">© MyFitZone</p>
        </form>
        </div>
      )
    }
}

export default SignupView