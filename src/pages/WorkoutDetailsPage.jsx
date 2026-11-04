import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Anchor, Button, Group, List, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { formatDate } from "../utils/formatDate";
import "./WorkoutDetailsPage.css";

const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

function WorkoutDetailsPage() {
  const [workout, setWorkout] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { workoutId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/workouts/${workoutId}`, authHeaders())
      .then((response) => setWorkout(response.data))
      .catch((error) => {
        console.log(error);
        setNotFound(true);
      });
  }, [workoutId]);

  const handleDelete = () => {
    modals.openConfirmModal({
      title: "Delete workout",
      centered: true,
      children: (
        <Text size="sm">
          Delete <strong>{workout.title}</strong>? This can't be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () =>
        axios
          .delete(`${API_URL}/api/workouts/${workoutId}`, authHeaders())
          .then(() => {
            notifications.show({ title: "Workout deleted", message: workout.title, color: "lane" });
            navigate("/workouts");
          })
          .catch(() =>
            notifications.show({ title: "Couldn't delete the workout", message: "Try again in a moment.", color: "red" })
          ),
    });
  };

  const backLink = (
    <Anchor component={Link} to="/workouts" size="sm" c="dimmed">
      Back to workouts
    </Anchor>
  );

  if (notFound) {
    return (
      <Stack gap="md" maw={720} mx="auto">
        {backLink}
        <Paper withBorder radius="lg" p="xl" ta="center">
          <Title order={3}>Workout not found</Title>
          <Text c="dimmed" mt="xs">It may have been deleted, or the link is wrong.</Text>
        </Paper>
      </Stack>
    );
  }

  if (!workout) {
    return (
      <Stack gap="md" maw={720} mx="auto">
        <Skeleton height={200} radius="lg" />
        <Skeleton height={160} radius="lg" />
      </Stack>
    );
  }

  const exercises = (workout.exercises || "").split("\n").map((line) => line.trim()).filter(Boolean);
  const discipline = workout.discipline;

  return (
    <Stack gap="lg" maw={720} mx="auto">
      {backLink}

      {/* Cabecera con la foto de la disciplina, en el mismo estilo que sus tarjetas */}
      <header className="workout-hero">
        {discipline?.imgUrl && <img className="workout-hero__image" src={discipline.imgUrl} alt="" />}
        <div className="workout-hero__overlay" />
        <div className="workout-hero__content">
          <Group gap="sm">
            <Text size="sm" fw={600} c="medal.3">
              {discipline?.name || "No discipline"}
            </Text>
            {workout.createdAt && (
              <Text size="sm" c="gray.4">
                {formatDate(workout.createdAt)}
              </Text>
            )}
          </Group>
          <Title order={1} c="white" mt={4}>
            {workout.title}
          </Title>
        </div>
      </header>

      <Group justify="flex-end" gap="xs">
        <Button variant="default" onClick={() => navigate(`/workouts/edit/${workout._id}`)}>
          Edit
        </Button>
        <Button variant="subtle" color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Group>

      <Paper withBorder radius="lg" p="xl">
        <Title order={3} mb="xs">Description</Title>
        <Text style={{ whiteSpace: "pre-line" }}>{workout.description}</Text>
      </Paper>

      <Paper withBorder radius="lg" p="xl">
        <Title order={3} mb="sm">Exercises</Title>
        {exercises.length > 0 ? (
          <List spacing="xs" type="ordered">
            {exercises.map((exercise, index) => (
              <List.Item key={index}>{exercise}</List.Item>
            ))}
          </List>
        ) : (
          <Text c="dimmed">No exercises added.</Text>
        )}
      </Paper>
    </Stack>
  );
}

export default WorkoutDetailsPage;
