import { Route, Routes } from "react-router-dom";
import { AppShell, Container } from "@mantine/core";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import WorkoutListPage from "./pages/WorkoutListPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage";
import EditWorkoutPage from "./pages/EditWorkoutpage";
import HomePage from "./pages/HomePage";
import DisciplineListPage from "./pages/DisciplineListPage";
import "./App.css";

function App() {
  return (
    <AppShell header={{ height: 64 }}>
      <AppShell.Header withBorder>
        <Navbar />
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workouts" element={<IsPrivate><WorkoutListPage /></IsPrivate>} />
            <Route path="/workouts/:workoutId" element={<IsPrivate><WorkoutDetailsPage /></IsPrivate>} />
            <Route path="/workouts/edit/:workoutId" element={<IsPrivate><EditWorkoutPage /></IsPrivate>} />
            <Route path="/disciplines" element={<IsPrivate><DisciplineListPage /></IsPrivate>} />
            <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
            <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          </Routes>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
