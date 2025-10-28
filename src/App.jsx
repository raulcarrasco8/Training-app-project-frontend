import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";  
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon"
import WorkoutListPage from "./pages/WorkoutListPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";  
import EditWorkoutPage from "./pages/EditWorkoutpage";   
import './App.css';
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workouts" element={<IsPrivate> <WorkoutListPage /> </IsPrivate>} />
        <Route path="/workouts/:workoutId" element={<IsPrivate> <WorkoutDetailsPage /> </IsPrivate>} />
        <Route path="/workouts/edit/:workoutId" element={<IsPrivate> <EditWorkoutPage /> </IsPrivate>} />

        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;
