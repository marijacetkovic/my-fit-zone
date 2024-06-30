import React from 'react';

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        };
    }

    render() {
        const { isLoggedIn } = this.state;

        return (
            <div className="px-4 py-5 my-5 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="d-block mx-auto mb-4" width="72" height="57" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
                </svg>                
                {isLoggedIn ? (
                    <h1 className="display-5 fw-bold text-body-emphasis">Hi User</h1>
                    ) : (
                    <h1 className="display-5 fw-bold text-body-emphasis">MyFitZone</h1>
                )}
                <div className="col-lg-6 mx-auto">
                    {isLoggedIn ? (
                        <p className="lead mb-4">Welcome back! Track, improve, and achieve your fitness goals with MyFitZone.</p>
                    ) : (
                        <p className="lead mb-4">Your fitness journey starts here. Track, improve, and achieve your fitness goals with MyFitZone, your new fitness companion.</p>
                    )}
                    <div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
                    {isLoggedIn ? (
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Continue</button>
                    ) : (<div>
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3 me-1">Register</button>
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Already a member?</button>                    
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeView;
