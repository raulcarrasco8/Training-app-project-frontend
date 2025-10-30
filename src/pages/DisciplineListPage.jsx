import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from '@mantine/notifications';
import axios from "axios";
import AddDiscipline from "../components/AddDiscipline";
import DisciplineCard from "../components/DisciplineCard";




const API_URL = import.meta.env.VITE_API_URL;


function DisciplineListPage() {
    const [discipline, setDiscipline] = useState([]);
    const navigate = useNavigate();

    const getAllDisciplines = () => {
        const storedToken = localStorage.getItem('authToken');

        axios.get(
            `${API_URL}/api/disciplines`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                setDiscipline(response.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllDisciplines();
    }, []);

    const handleView = (disciplineId) => {
        navigate(`/workouts?discipline=${disciplineId}`);
    }

    const handleDelete = (disciplineId) => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .delete(`${API_URL}/api/discipline/${disciplineId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then(() => {
                getAllDisciplines();
                notifications.show({
                    title: 'Success',
                    message: 'Discipline deleted successfully',
                    color: 'green'
                });
            })
            .catch((error) => {
                console.log(error);
                notifications.show({
                    title: 'Error',
                    message: 'Could not delete Discipline',
                    color: 'red'
                });
            });
    };

    return (
        <div className="DisciplineListPage">
            <AddDiscipline refreshDiscipline={getAllDisciplines} />

            {discipline.map((discipline) => (
                <DisciplineCard
                    key={discipline._id}
                    discipline={discipline}
                    onView={handleView}
                    onDelete={handleDelete}
                    refreshDiscipline={getAllDisciplines}
                />
            ))}
        </div>
    )
}

export default DisciplineListPage