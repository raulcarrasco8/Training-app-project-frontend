

import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { notifications } from '@mantine/notifications';

import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/WorkoutCard";


const API_URL = import.meta.env.VITE_API_URL;


function WorkoutListPage() {
    const [workouts, setWorkouts] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    // Get the values from the URL query strings
    const disciplineId = searchParams.get("discipline");


    const navigate = useNavigate();

    const getAllWorkouts = () => {
        const storedToken = localStorage.getItem('authToken');

        // ✅ Si hay disciplineId, filtrar por disciplina
        const url = disciplineId
            ? `${API_URL}/api/workouts?discipline=${disciplineId}`
            : `${API_URL}/api/workouts`;

       

        axios.get(
            url,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                
                setWorkouts(response.data);

            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllWorkouts();
    }, [disciplineId]); // ✅ Agregar disciplineId como dependencia

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
                getAllWorkouts();
                notifications.show({
                    title: 'Success',
                    message: 'Workout deleted successfully',
                    color: 'green'
                });
            })
            .catch((error) => {
                console.log(error);
                notifications.show({
                    title: 'Error',
                    message: 'Could not delete workout',
                    color: 'red'
                });
            });
    };

    return (
        <div className="WorkoutListPage">
            <AddWorkout refreshWorkouts={getAllWorkouts} />

            {workouts.length === 0 ? (
                <p>No workouts found for this discipline</p>
            ) : (
                workouts.map((workout) => (
                    <WorkoutCard
                        key={workout._id}
                        workout={workout}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                        refreshWorkouts={getAllWorkouts}
                    />
                ))
            )}
        </div>
    );
}

export default WorkoutListPage;