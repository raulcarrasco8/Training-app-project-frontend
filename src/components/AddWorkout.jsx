import { useState } from "react";
import axios from "axios";
import { TextInput, Textarea, Button } from '@mantine/core'; // Import Mantine components


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
            <TextInput
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextInput
                placeholder="Discipline"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
            />
            <TextInput
                placeholder="Exercises"
                value={exercises}
                onChange={(e) => setExercises(e.target.value)}
            />
            <Button type="submit">Add Workout</Button> {/* Use Mantine Button */}
        </form>
    );
}

export default AddWorkout;

