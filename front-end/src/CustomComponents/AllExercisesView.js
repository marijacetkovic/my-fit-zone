import React from 'react'

class AllExercisesView extends React.Component {
  render() {
    return(
        <div className='row'>
            <div className='row col-10 col-sm-10 justify-content-center'>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
                <div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">Squats</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>
            </div>
            <div class="dropdown col-2 col-sm-2 mt-2">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  </button>
  <div class="dropdown-menu dropdown-menu-left " aria-labelledby="dropdownMenuButton">
        <div className="container">
                <h5>Add Exercise</h5>
                <form>
                    <div className="form-group">
                    <label htmlFor="exerciseName">Exercise Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exerciseName"
                        name="name"
                        placeholder="Enter exercise name"
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
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