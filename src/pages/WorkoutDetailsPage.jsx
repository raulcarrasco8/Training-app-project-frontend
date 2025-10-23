import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function WorkoutDetailsPage(props) {
    const [workout, setWorkout] = useState(null);
    const { workoutId } = useParams();

    const getWorkout = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${API_URL}/api/workouts/${workoutId}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((response) => {
                const oneWorkout = response.data;
                setWorkout(oneWorkout);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getWorkout();
    }, []);

    return (
        <div className="WorkoutDetailsPage">
            {workout ? (
                <>
                    <h2>{workout.title}</h2>
                    <p>{workout.description}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default WorkoutDetailsPage;
