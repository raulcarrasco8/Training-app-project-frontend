
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/WorkoutCard";


const API_URL = "http://localhost:5005";


function WorkoutListPage() {
    const [workouts, setWorkouts] = useState([]);
    const navigate = useNavigate();

    const getAllWorkouts = () => {
        const storedToken = localStorage.getItem('authToken');

        axios.get(
            `${API_URL}/api/workouts`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                setWorkouts(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllWorkouts();
    }, []);

    const handleEdit = (workoutId) => {
        navigate(`/workouts/edit/${workoutId}`);
    };

    const handleView = (workoutId) => {
        navigate(`/workouts/${workoutId}`);
    };

    const handleDelete = (workoutId) => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .delete(`${API_URL}/api/workouts/${workoutId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(() => {
                getAllWorkouts(); // Refresca la lista después de eliminar
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="WorkoutListPage">
            <AddWorkout refreshWorkouts={getAllWorkouts} />

            {workouts.map((workout) => (
                <WorkoutCard 
                 key={workout._id}
                 workout={workout}
                 onEdit={handleEdit}
                 onView={handleView}
                 onDelete={handleDelete}
                 refreshWorkouts={getAllWorkouts}
                 />
            ))}
        </div>
    );
}

export default WorkoutListPage;
