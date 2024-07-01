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


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHome:true,
      CurrentPage:"home"
    }
  } 


  QGetView = (state) => {
    const page = state.CurrentPage;
    console.log('im here')
    console.log(page)
    switch(page) {
      case "home":
        return <HomeView QUnSetHomeFromChild={this.QUnSetHome}
        QIDFromChild={this.QSetView}/>;
      case "diary":
        return <DiaryView />;  
      case "events":
        return <EventView />;
      case "addentry":
        return <AddEntryView />;
      case "addworkout":
        return <AddWorkoutView />;
      case "exercises":
        return <AllExercisesView />;
      case "workouts":
        return <AllWorkoutsView />;
      case "signup":
        return <SignupView QUnSetHomeFromChild={this.QUnSetHome} QIDFromChild={this.QSetView}/>;
      case "login":
        return <LoginView QUnSetHomeFromChild={this.QUnSetHome} QIDFromChild={this.QSetView}/>;
      case "singleexercise":
        return <SingleExerciseView />;
      case "singleworkout":
        return <SingleWorkoutView />;
      case "profile":
        return <UserProfileView />;
      default:
        return <HomeView />;
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

  render() {
    return (
      <div id="viewer" className="container-fluid">
        <div className="row">
          {/* if not homepage display sidebar */}
          {!this.state.isHome && (
            <div className="col-3 col-sm-2">
              <SideBarView QSetHomeFromChild={this.QSetHome} QIDFromChild={this.QSetView}/>
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
