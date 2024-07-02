import React from "react";

class WorkoutSelectDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const data = [];
        return(
            <div>
                 <div class="modal show" style={{ display: 'block' }}>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className='row col-10 col-sm-10 justify-content-center'>
            {data.length > 0 ?
                    data.map((d) => {            
                return (<div className="card col-8 col-sm-4 col-md-4 col-lg-3" style={{ margin: '1rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Full-body</h6>
                <a href="#" className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Explore</a>
                </div>
                </div>)}) : "Loading..."}
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" onClick={()=>this.props.onClose()} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
            </div>
            </div>
        )
    }
}

export default WorkoutSelectDialog;