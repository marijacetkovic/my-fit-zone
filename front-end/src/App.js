import React from 'react'
import AddEntryView from './CustomComponents/AddEntryView';
import AddExerciseView from './CustomComponents/AddExerciseView';
import AddWorkoutView from './CustomComponents/AddWorkoutView';
import AllExercisesView from './CustomComponents/AllExercisesView';
import AllWorkoutsView from './CustomComponents/AllWorkoutsView';
import DashboardView from './CustomComponents/DashboardView';
import EventView from './CustomComponents/EventView';
import LoginView from './CustomComponents/LoginView';
import SignupView from './CustomComponents/SignupView';
import SingleExerciseView from './CustomComponents/SingleExerciseView';
import SingleWorkoutView from './CustomComponents/SingleWorkoutView';
import UserProfileView from './CustomComponents/UserProfileView';


class App extends React.Component{

   QGetView = (state) => {
    const page = state.CurrentPage;

    switch(page) {
      case "home":
        return <DashboardView />;
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
        return <DashboardView />;
    }
  };
  

  render(){return <div><LoginView /></div>}
}
export default App;
