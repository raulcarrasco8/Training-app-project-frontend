import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { TextInput, Textarea } from "@mantine/core";
import { Button } from "@mantine/core";
import "./AddDiscipline.css"

const API_URL = import.meta.env.VITE_API_URL;

function AddDiscipline(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleTitle = (e) => {
        e.preventDefault();
        const requestBody = { 
            name, 
            description, 
            imgUrl: image 
        };

        const storedToken = localStorage.getItem('authToken');

        axios.post(`${API_URL}/api/disciplines`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((response) => {
                setName("");
                setDescription("");
                setImage("");

                notifications.show({
                    title: 'Succes',
                    message: ''
                })
            })
    }

    return (
            <form className="CreateDiscipline" onSubmit={handleTitle}>
                <h3>Create your Discipline</h3>
    
                <TextInput
                    label="Name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                    label="Description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextInput
                    label="Image URL"
                    placeholder="image"
                    onChange={(e) => setImage(e.target.value)}
                />
                <Button type="submit">Add Discipline</Button> 
            </form>
        );
}


export default AddDiscipline