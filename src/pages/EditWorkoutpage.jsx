import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from '@mantine/notifications';

const API_URL = "http://localhost:5005";

function EditWorkoutPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [exercises, setExercises] = useState("");

    const { workoutId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios
            .get(`${API_URL}/api/workouts/${workoutId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const workout = response.data;
                setTitle(workout.title);
                setDescription(workout.description);
                setDiscipline(workout.discipline);
                setExercises(workout.exercises);
            })
            .catch((error) => console.log(error));
    }, [workoutId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, discipline, exercises };
        const storedToken = localStorage.getItem('authToken');

        axios
            .put(`${API_URL}/api/workouts/${workoutId}`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                notifications.show({
                    title: 'Success',
                    message: 'Workout updated successfully!',
                    color: 'green'
                });
                navigate(`/workouts/${workoutId}`);
            })
            .catch((error) => {
                console.log(error);
                notifications.show({
                    title: 'Error',
                    message: 'Could not update the workout',
                    color: 'red'
                });
            });
    };



    return (
        <div className="EditWorkoutPage">
            <h2>Edit Workout</h2>

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Discipline:</label>
                <input
                    type="text"
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                />
                <label>Exercises:</label>
                <textarea
                    value={exercises}
                    onChange={(e) => setExercises(e.target.value)}
                />
                <button type="submit">Update Workout</button>
            </form>
        </div>
    );
}

export default EditWorkoutPage;