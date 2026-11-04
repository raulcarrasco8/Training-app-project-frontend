import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Chip, Group, Modal, Paper, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";

const API_URL = import.meta.env.VITE_API_URL;
const ALL = "all";

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
});

function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // El filtro vive en la URL (?discipline=...) para poder compartir el enlace
  const disciplineId = searchParams.get("discipline");
  const activeDiscipline = disciplines.find((d) => d._id === disciplineId);

  const getAllWorkouts = () => {
    const url = disciplineId
      ? `${API_URL}/api/workouts?discipline=${disciplineId}`
      : `${API_URL}/api/workouts`;

    return axios
      .get(url, authHeaders())
      .then((response) => {
        // Más recientes primero
        const sorted = [...response.data].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        setWorkouts(sorted);
        setLoadError(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadError(true);
      });
  };

  // Disciplinas: para los filtros y el formulario
  useEffect(() => {
    axios
      .get(`${API_URL}/api/disciplines`, authHeaders())
      .then((response) => setDisciplines(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAllWorkouts().finally(() => setIsLoading(false));
  }, [disciplineId]);

  const handleFilterChange = (value) => {
    setSearchParams(value === ALL ? {} : { discipline: value });
  };

  const handleCreate = (values) =>
    axios
      .post(`${API_URL}/api/workouts`, values, authHeaders())
      .then(() => {
        notifications.show({ title: "Workout created", message: values.title, color: "lane" });
        closeModal();
        getAllWorkouts();
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Couldn't create the workout",
          message: error.response?.data?.message || "Check the fields and try again.",
          color: "red",
        });
      });

  const handleDelete = (workoutId) => {
    axios
      .delete(`${API_URL}/api/workouts/${workoutId}`, authHeaders())
      .then(() => {
        getAllWorkouts();
        notifications.show({ title: "Workout deleted", message: "It's no longer in your list.", color: "lane" });
      })
      .catch((error) => {
        console.log(error);
        notifications.show({ title: "Couldn't delete the workout", message: "Try again in a moment.", color: "red" });
      });
  };

  const renderEmptyState = () => {
    if (disciplines.length === 0) {
      return (
        <Paper withBorder radius="lg" p="xl" ta="center">
          <Title order={3}>Create a discipline first</Title>
          <Text c="dimmed" mt="xs" mb="lg">
            Every workout belongs to a discipline, like Running or Gym.
          </Text>
          <Button component={Link} to="/disciplines">Go to disciplines</Button>
        </Paper>
      );
    }

    return (
      <Paper withBorder radius="lg" p="xl" ta="center">
        <Title order={3}>
          {activeDiscipline ? `No ${activeDiscipline.name} workouts yet` : "No workouts yet"}
        </Title>
        <Text c="dimmed" mt="xs" mb="lg">
          Log your first session to start building your history.
        </Text>
        <Group justify="center">
          <Button onClick={openModal}>New workout</Button>
          {activeDiscipline && (
            <Button variant="default" onClick={() => handleFilterChange(ALL)}>
              Show all workouts
            </Button>
          )}
        </Group>
      </Paper>
    );
  };

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={1}>{activeDiscipline ? activeDiscipline.name : "Workouts"}</Title>
          <Text c="dimmed">
            {isLoading
              ? "Loading your sessions"
              : `${workouts.length} ${workouts.length === 1 ? "session" : "sessions"}${activeDiscipline ? "" : " across all disciplines"}`}
          </Text>
        </div>
        <Button onClick={openModal} disabled={disciplines.length === 0}>
          New workout
        </Button>
      </Group>

      {disciplines.length > 0 && (
        <Chip.Group value={disciplineId ?? ALL} onChange={handleFilterChange}>
          <Group gap="xs">
            <Chip value={ALL} color="lane" variant="light">All</Chip>
            {disciplines.map((d) => (
              <Chip key={d._id} value={d._id} color="lane" variant="light">
                {d.name}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      )}

      {loadError && (
        <Alert color="red" title="Couldn't load your workouts">
          Check your connection and reload the page.
        </Alert>
      )}

      {isLoading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} height={190} radius="lg" />
          ))}
        </SimpleGrid>
      ) : workouts.length === 0 && !loadError ? (
        renderEmptyState()
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              onEdit={(id) => navigate(`/workouts/edit/${id}`)}
              onDelete={handleDelete}
            />
          ))}
        </SimpleGrid>
      )}

      <Modal opened={modalOpened} onClose={closeModal} title="New workout" centered size="lg">
        {/* key: al abrir con otro filtro, el formulario arranca con esa disciplina */}
        <WorkoutForm
          key={disciplineId ?? ALL}
          disciplines={disciplines}
          initialValues={{ discipline: disciplineId }}
          onSubmit={handleCreate}
          onCancel={closeModal}
          submitLabel="Create workout"
        />
      </Modal>
    </Stack>
  );
}

export default WorkoutListPage;
