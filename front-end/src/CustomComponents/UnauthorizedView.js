import React from 'react';

class UnauthorizedView extends React.Component {
    QSetViewInParent = (obj) => {
        this.props.QIDFromChild(obj);
    }
    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="d-block mx-auto mb-4" width="72" height="57" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
                </svg>                
                <h1 className="display-5 fw-bold text-body-emphasis">Please log in</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">You are not allowed to access this page. Please proceed to login.</p>
                    <button type="button" onClick={()=>this.QSetViewInParent({page:'login'})} className="btn btn-primary btn-lg px-4 gap-3">Proceed</button>
                </div>
            </div>
        );
    }
}

export default UnauthorizedView;
