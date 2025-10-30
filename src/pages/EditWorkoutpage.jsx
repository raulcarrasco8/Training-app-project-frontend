import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from '@mantine/notifications';
import { Button, TextInput, Textarea } from '@mantine/core';
import "./EditWorkoutPage.css";
import { Select } from "@mantine/core";


const API_URL = import.meta.env.VITE_API_URL;

function EditWorkoutPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [exercises, setExercises] = useState("");

    const { workoutId } = useParams();
    const navigate = useNavigate();
    const [disciplineArray, setDisciplineArray] = useState([]);

        //Cargar las disciplinas disponibles
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(`${API_URL}/api/disciplines`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((res) => setDisciplineArray(res.data))
            .catch((err) => console.error("Error fetching disciplines", err));
    }, []);

        //Cargar el Workout a editar
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
                <TextInput
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Select
                    label="Discipline"
                    placeholder="Select a discipline"
                    value={discipline}
                    onChange={setDiscipline}
                    data={disciplineArray.map(d => ({
                        label: d.name,
                        value: d._id,
                    }))}
                />
                <Textarea
                    label="Exercises"
                    value={exercises}
                    onChange={(e) => setExercises(e.target.value)}
                />
                <Button color="green" variant="light" type="submit">Update Workout</Button>
                <Button color="indigo" variant="light" type="button" onClick={() => navigate('/workouts')}>Return</Button>
            </form>
        </div>
    );
}

export default EditWorkoutPage;