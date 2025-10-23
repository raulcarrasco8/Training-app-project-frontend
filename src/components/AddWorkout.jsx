import { useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:5005";

function AddWorkout(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [exercises, setExercises] = useState("");

    const handleTitle = (e) => {
        e.preventDefault();
        const requestBody = { title, description, discipline, exercises };

        const storedToken = localStorage.getItem('authToken');

        axios.post(`${API_URL}/api/workouts`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((response) => {
                // Clear the form fields
                setTitle("");
                setDescription("");
                setDiscipline("");
                setExercises("");

                // Call the refreshWorkouts function passed as a prop
                props.refreshWorkouts();
            })
            .catch((error) => console.log(error));
    };

    return (
        <form onSubmit={handleTitle}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Discipline"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
            />
            <input
                type="text"
                placeholder="Exercises"
                value={exercises}
                onChange={(e) => setExercises(e.target.value)}
            />
            <button type="submit">Add Workout</button>
        </form>
    );
}

export default AddWorkout;

