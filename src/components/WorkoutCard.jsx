import { Button } from '@mantine/core'; 
import "./WorkoutCard.css";
import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';


function WorkoutCard({workout, onEdit, onView, onDelete}) {

     // Función para abrir el modal de confirmación antes de eliminar
  const openDeleteModal = (id) => {
    modals.openConfirmModal({
      title: 'Confirm delete',
      classNames: {
        root: 'custom-modal-root'
      },
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{workout.title}</strong>? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Delete cancelled'),
      onConfirm: () => onDelete(id),
    });
  };

    return (
        <div className="WorkoutCard">
            <h3>{workout.title}</h3>
            <p><strong>Description:</strong> {workout.description}</p>
            <p><strong>Discipline:</strong> {workout.discipline?.name || "No hay deporte assignado"}</p>
            <Button color="orange" variant='outline' onClick={() => onView(workout._id)}>View Details</Button> 
            <Button color="blue" variant='outline' onClick={() => onEdit(workout._id)}>Edit</Button> 
            <Button color="red" variant="outline" onClick={() => openDeleteModal(workout._id)}>Delete</Button> 
        </div>
    );
}

export default WorkoutCard;