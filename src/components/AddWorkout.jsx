import { useEffect, useState } from "react";
import axios from "axios";
import { TextInput, Textarea, Button, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import "./AddWorkout.css";
import { NativeSelect } from '@mantine/core';

const API_URL = import.meta.env.VITE_API_URL;

function AddWorkout(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [exercises, setExercises] = useState("");

    const [disciplineArray, setDisciplineArray] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(`${API_URL}/api/disciplines`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((res) => setDisciplineArray(res.data))
            .catch((err) => console.error("Error fetching disciplines", err));
    }, []);

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

                notifications.show({
                    title: 'Success',
                    message: 'Workout created successfully!',
                    color: 'green'
                });

                // Call the refreshWorkouts function passed as a prop
                props.refreshWorkouts();
            })
            .catch((error) => {
                console.log(error);
                notifications.show({
                    title: 'Error',
                    message: 'Could not create the workout',
                    color: 'red'
                });
            });
    };

    return (
        <form className="CreateWorkout" onSubmit={handleTitle}>
            <h3>Create your Workout</h3>

            <TextInput
                label="Title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Select
                label="Discipline"
                placeholder="Select a discipline"
                onChange={setDiscipline}
                data={disciplineArray.map(d => ({
                        label: d.name,
                        value: d._id, 
                    }))
                }
            />

            <Textarea
                label="Description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextInput
                label="Exercises"
                placeholder="Exercises"
                value={exercises}
                onChange={(e) => setExercises(e.target.value)}
            />
            <Button type="submit">Add Workout</Button>
        </form>
    );
}

export default AddWorkout;

