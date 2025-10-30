import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import "./DisciplineCard.css"  

function DisciplineCard({discipline, onView, onDelete}) {

    const openDeleteModal = (id) => {
        modals.openConfirmModal({
          title: 'Confirm delete',
          classNames: {
            root: 'custom-modal-root'
          },
          centered: true,
          children: (
            <Text size="sm">
              Are you sure you want to delete <strong>{discipline.name}</strong>? This action cannot be undone.
            </Text>
          ),
          labels: { confirm: 'Delete', cancel: 'Cancel' },
          confirmProps: { color: 'red' },
          onCancel: () => console.log('Delete cancelled'),
          onConfirm: () => onDelete(id),
        });
       

    };

        return (
            <div className="DisciplineCard">
                <h3>{discipline.name}</h3>
                <p><strong>Description:</strong> {discipline.description}</p>
                <img 
                    src={discipline.imgUrl}
                    alt={discipline.name}
                 />
                <Button color="orange" variant='outline' onClick={() => onView(discipline._id)}>View Workouts</Button>
                <Button color="red" variant="outline" onClick={() => openDeleteModal(discipline._id)}>Delete</Button> 
            </div>
        );
}

export default DisciplineCard;