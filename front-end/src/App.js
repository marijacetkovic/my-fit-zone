import React from 'react'
import AddEntryView from './AddEntryView';
import AddExerciseView from './AddExerciseView';
import AddWorkoutView from './AddWorkoutView';
import AllExercisesView from './AllExercisesView';
import AllWorkoutsView from './AllWorkoutsView';
import DashboardView from './DashboardView';
import EventView from './EventView';
import LoginView from './LoginView';
import SignupView from './SignupView';
import SingleExerciseView from './SingleExerciseView';
import SingleWorkoutView from './SingleWorkoutView';
import UserProfileView from './UserProfileView';


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
  

  render(){return}
}
export default App;
