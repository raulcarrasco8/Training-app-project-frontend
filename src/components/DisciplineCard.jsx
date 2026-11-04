import { useState } from "react";
import { Button, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import "./DisciplineCard.css";

// Tarjeta tipo "póster deportivo": foto a sangre, degradado y nombre grande
function DisciplineCard({ discipline, onView, onEdit, onDelete }) {
  // Si la imagen falla (URL rota), mostramos un fondo de color en su lugar
  const [imageFailed, setImageFailed] = useState(false);

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: "Delete discipline",
      centered: true,
      children: (
        <Text size="sm">
          Delete <strong>{discipline.name}</strong>? This can't be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => onDelete(discipline._id),
    });
  };

  return (
    <article className="discipline-card">
      {discipline.imgUrl && !imageFailed ? (
        <img
          className="discipline-card__image"
          src={discipline.imgUrl}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="discipline-card__image discipline-card__image--fallback" aria-hidden="true" />
      )}

      <div className="discipline-card__overlay" />

      <div className="discipline-card__content">
        <h2 className="discipline-card__name">{discipline.name}</h2>
        <Text className="discipline-card__description" size="sm" lineClamp={2}>
          {discipline.description}
        </Text>

        <Group gap="xs" mt="md">
          <Button size="xs" variant="white" color="dark" onClick={() => onView(discipline._id)}>
            View workouts
          </Button>
          <Button size="xs" variant="subtle" className="discipline-card__delete" onClick={() => onEdit(discipline)}>
            Edit
          </Button>
          <Button size="xs" variant="subtle" className="discipline-card__delete" onClick={openDeleteModal}>
            Delete
          </Button>
        </Group>
      </div>
    </article>
  );
}

export default DisciplineCard;
