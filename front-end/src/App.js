import React from 'react'
import HomeView from './CustomComponents/HomeView';
import AddEntryView from './CustomComponents/AddEntryView';
import AddWorkoutView from './CustomComponents/AddWorkoutView';
import AllExercisesView from './CustomComponents/AllExercisesView';
import AllWorkoutsView from './CustomComponents/AllWorkoutsView';
import DiaryView from './CustomComponents/DiaryView';
import EventView from './CustomComponents/EventView';
import LoginView from './CustomComponents/LoginView';
import SignupView from './CustomComponents/SignupView';
import SingleExerciseView from './CustomComponents/SingleExerciseView';
import SingleWorkoutView from './CustomComponents/SingleWorkoutView';
import UserProfileView from './CustomComponents/UserProfileView';
import SideBarView from './CustomComponents/SideBarView';
import UnauthorizedView from './CustomComponents/UnauthorizedView';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHome:true,
      CurrentPage:"home",
      user:{
        logged:false
      }
    }
  } 


  QGetView = (state) => {
    const page = state.CurrentPage;
    console.log('getting view ' + page);
    console.log(this.state.user.logged);

    const logged = this.state.user.logged;

    switch (page) {
        case "home":
            return <HomeView user={this.state.user} QUnSetHomeFromChild={this.QUnSetHome} QIDFromChild={this.QSetView}/>;
        case "diary":
            return logged ? <DiaryView QSetHomeFromChild={this.QSetHome} QIDFromChild={this.QSetView}/> : <UnauthorizedView />;
        case "events":
            return logged ? <EventView /> : <UnauthorizedView />;
        case "addentry":
            return logged ? <AddEntryView  QSetHomeFromChild={this.QSetHome} QIDFromChild={this.QSetView} /> : <UnauthorizedView />;
        case "exercises":
            return logged ? <AllExercisesView QSetHomeFromChild={this.QSetHome} QIDFromChild={this.QSetView}/> : <UnauthorizedView />;
        case "workouts":
            return logged ? <AllWorkoutsView  QSetHomeFromChild={this.QSetHome} QIDFromChild={this.QSetView}/> : <UnauthorizedView />;
        case "signup":
            return <SignupView QUnSetHomeFromChild={this.QUnSetHome} QIDFromChild={this.QSetView}/>;
        case "login":
            return <LoginView QUserFromChild={this.QSetUser} QUnSetHomeFromChild={this.QUnSetHome} QIDFromChild={this.QSetView}/>;
        case "profile":
            return logged ? <UserProfileView user={this.state.user} /> : <UnauthorizedView />;
        case "unauthorized":
            return <UnauthorizedView QIDFromChild={this.QSetView} />
        default:
            return <HomeView user={this.state.user} />;
    }
};


  QSetView = (obj) => {
    this.setState({
      CurrentPage:obj.page
    })
  };
    
  QUnSetHome = () => {
    this.setState({
      isHome:false,
      CurrentPage:"diary"
    })
  }
  QSetHome = () => {
    this.setState({
      isHome:true,
      CurrentPage:"home"
    })
    console.log("elenaaaaaaaaaa")
    console.log(this.state.isHome)
  }
  QSetUser = (obj) => {
    console.log("app.js")
    this.setState({
      user: obj,
    },
    () => {
      console.log(this.state.user);
    })

  }

  render() {
    return (
      <div id="viewer" className="container-fluid">
        <div className="row">
          {/* if not homepage display sidebar */}
          {!this.state.isHome && (
            <div className="col-3 col-sm-2">
              <SideBarView QUserFromChild={this.QSetUser} QSetHomeFromChild={this.QSetHome} 
              QIDFromChild={this.QSetView}/>
            </div>
          )}

          <div className={this.state.isHome ? "" : "col-9 col-sm-10"}>
            {this.QGetView(this.state)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
