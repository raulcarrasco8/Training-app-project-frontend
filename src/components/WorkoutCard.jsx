import { Button } from '@mantine/core'; 

function WorkoutCard({workout, onEdit, onView, onDelete}) {

    return (
        <div className="WorkoutCard">
            <h3>{workout.title}</h3>
            <p>{workout.description}</p>
            <p><strong>Discipline:</strong> {workout.discipline}</p>
            <Button color="blue" variant='light' onClick={() => onEdit(workout._id)}>Edit</Button> {/* Blue button for Edit */}
            <Button color="orange" variant='light' onClick={() => onView(workout._id)}>View Details</Button> {/* Orange button for View Details */}
            <Button color="red" variant="outline" onClick={() => onDelete(workout._id)}>Delete</Button> {/* Red button for Delete */}
        </div>
    );
}

export default WorkoutCard;