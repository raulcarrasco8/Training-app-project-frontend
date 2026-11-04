import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Group, Modal, Paper, SimpleGrid, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import AddDiscipline from "../components/AddDiscipline";
import DisciplineCard from "../components/DisciplineCard";

const API_URL = import.meta.env.VITE_API_URL;

function DisciplineListPage() {
  const [disciplines, setDisciplines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const navigate = useNavigate();

  const getAllDisciplines = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/disciplines`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setDisciplines(response.data);
        setLoadError(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllDisciplines();
  }, []);

  const handleView = (disciplineId) => {
    navigate(`/workouts?discipline=${disciplineId}`);
  };

  const handleCreated = () => {
    closeModal();
    getAllDisciplines();
  };

  const handleDelete = (disciplineId) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/api/disciplines/${disciplineId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        getAllDisciplines();
        notifications.show({
          title: "Discipline deleted",
          message: "It's no longer in your list.",
          color: "lane",
        });
      })
      .catch((error) => {
        console.log(error);
        // 409: la disciplina tiene workouts asociados -> mostrar el aviso del backend
        const isConflict = error.response?.status === 409;
        notifications.show({
          title: isConflict ? "Discipline in use" : "Couldn't delete the discipline",
          message: error.response?.data?.message || "Try again in a moment.",
          color: isConflict ? "medal" : "red",
        });
      });
  };

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={1}>Disciplines</Title>
          <Text c="dimmed">Group your workouts by sport.</Text>
        </div>
        <Button onClick={openModal}>New discipline</Button>
      </Group>

      {loadError && (
        <Alert color="red" title="Couldn't load your disciplines">
          Check your connection and reload the page.
        </Alert>
      )}

      {isLoading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} height={320} radius="lg" />
          ))}
        </SimpleGrid>
      ) : disciplines.length === 0 && !loadError ? (
        <Paper withBorder radius="lg" p="xl" ta="center">
          <Title order={3}>No disciplines yet</Title>
          <Text c="dimmed" mt="xs" mb="lg">
            Create your first discipline to start logging workouts.
          </Text>
          <Button onClick={openModal}>New discipline</Button>
        </Paper>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {disciplines.map((discipline) => (
            <DisciplineCard
              key={discipline._id}
              discipline={discipline}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))}
        </SimpleGrid>
      )}

      <Modal opened={modalOpened} onClose={closeModal} title="New discipline" centered>
        <AddDiscipline onCreated={handleCreated} onCancel={closeModal} />
      </Modal>
    </Stack>
  );
}

export default DisciplineListPage;
