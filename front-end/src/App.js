import React from 'react'
import HomeView from './CustomComponents/HomeView';
import AddEntryView from './CustomComponents/AddEntryView';
import AddExerciseView from './CustomComponents/AddExerciseView';
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
      isHome:false
    }
  } 


  QGetView = (state) => {
    const page = state.CurrentPage;
    switch(page) {
      case "home":
        return <HomeView />;
      case "diary":
        return <DiaryView />;  
      case "about":
        return <EventView />;
      case "addentry":
        return <AddEntryView />;
      case "addexercise":
        return <AddExerciseView />;
      case "addworkout":
        return <AddWorkoutView />;
      case "allexercises":
        return <AllExercisesView />;
      case "allworkouts":
        return <AllWorkoutsView />;
      case "signup":
        return <SignupView />;
      case "login":
        return <LoginView />;
      case "singleexercise":
        return <SingleExerciseView />;
      case "singleworkout":
        return <SingleWorkoutView />;
      case "userprofile":
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
    
  

  render() {
    return (
      <div id="viewer" className="container-fluid">
        <div className="row">
          {/* if not homepage display sidebar */}
          {!this.state.isHome && (
            <div className="col-lg-2">
              <SideBarView />
            </div>
          )}

          <div className={this.state.isHome ? "" : "col-lg-8"}>
            {/* if home display home, else other components */}
            {this.state.isHome ? (
              <HomeView />
            ) : 
            (
              <AllWorkoutsView />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
