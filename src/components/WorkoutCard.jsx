import { Link } from "react-router-dom";
import { Badge, Button, Group, Paper, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { formatDate } from "../utils/formatDate";
import "./WorkoutCard.css";

function WorkoutCard({ workout, onEdit, onDelete }) {
  const openDeleteModal = () => {
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
      onConfirm: () => onDelete(workout._id),
    });
  };

  const exerciseCount = workout.exercises
    ? workout.exercises.split("\n").filter((line) => line.trim()).length
    : 0;

  return (
    <Paper withBorder radius="lg" p="lg" className="workout-card">
      <Group justify="space-between" mb="sm" wrap="nowrap">
        <Badge variant="light" color="lane" radius="sm">
          {workout.discipline?.name || "No discipline"}
        </Badge>
        {workout.createdAt && (
          <Text size="xs" c="dimmed">
            {formatDate(workout.createdAt)}
          </Text>
        )}
      </Group>

      <Link to={`/workouts/${workout._id}`} className="workout-card__title">
        {workout.title}
      </Link>

      <Text size="sm" c="dimmed" mt={6} lineClamp={3} className="workout-card__description">
        {workout.description}
      </Text>

      <Group justify="space-between" mt="lg">
        <Text size="xs" c="dimmed">
          {exerciseCount} {exerciseCount === 1 ? "exercise" : "exercises"}
        </Text>
        <Group gap={4}>
          <Button size="xs" variant="subtle" color="dark" onClick={() => onEdit(workout._id)}>
            Edit
          </Button>
          <Button size="xs" variant="subtle" color="red" onClick={openDeleteModal}>
            Delete
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

export default WorkoutCard;
