import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Anchor, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import WorkoutForm from "../components/WorkoutForm";

const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

function EditWorkoutPage() {
  const [workout, setWorkout] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const { workoutId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/disciplines`, authHeaders())
      .then((response) => setDisciplines(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/workouts/${workoutId}`, authHeaders())
      .then((response) => setWorkout(response.data))
      .catch((error) => {
        console.log(error);
        setNotFound(true);
      });
  }, [workoutId]);

  const handleUpdate = (values) =>
    axios
      .put(`${API_URL}/api/workouts/${workoutId}`, values, authHeaders())
      .then(() => {
        notifications.show({ title: "Workout saved", message: values.title, color: "lane" });
        navigate(`/workouts/${workoutId}`);
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Couldn't save the workout",
          message: error.response?.data?.message || "Check the fields and try again.",
          color: "red",
        });
      });

  return (
    <Stack gap="md" maw={640} mx="auto">
      <Anchor component={Link} to={`/workouts/${workoutId}`} size="sm" c="dimmed">
        Back to workout
      </Anchor>
      <Title order={1}>Edit workout</Title>

      <Paper withBorder radius="lg" p="xl">
        {notFound ? (
          <Text c="dimmed">This workout doesn't exist or was deleted.</Text>
        ) : !workout ? (
          <Stack>
            <Skeleton height={36} />
            <Skeleton height={36} />
            <Skeleton height={80} />
            <Skeleton height={120} />
          </Stack>
        ) : (
          <WorkoutForm
            disciplines={disciplines}
            initialValues={{
              title: workout.title,
              // discipline viene populado (objeto) o null si es huérfano
              discipline: workout.discipline?._id ?? null,
              description: workout.description,
              exercises: workout.exercises,
            }}
            onSubmit={handleUpdate}
            onCancel={() => navigate(`/workouts/${workoutId}`)}
            submitLabel="Save changes"
          />
        )}
      </Paper>
    </Stack>
  );
}

export default EditWorkoutPage;
