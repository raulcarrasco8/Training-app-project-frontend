import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextInput } from '@mantine/core';
import "./WorkoutDetailsPage.css";

const API_URL = "http://localhost:5005";

function WorkoutDetailsPage(props) {
    const [workout, setWorkout] = useState(null);
    const { workoutId } = useParams();
    const navigate = useNavigate();

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
    }, [workoutId]);

    return (
        <div className="WorkoutDetailsPage">
            {workout ? (
                <>
                    <h2>{workout.title}</h2>
                    <TextInput
                        label="Description:"
                        value={workout.description}
                        readOnly
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Button color="indigo" variant="light" type="button" onClick={() => navigate('/workouts')}>Return</Button>
        </div>
    );
}

export default WorkoutDetailsPage;
