import { Button } from '@mantine/core'; 

function WorkoutCard({workout, onEdit, onView, onDelete}) {

    return (
        <div className="WorkoutCard">
            <h3>{workout.title}</h3>
            <p>{workout.description}</p>
            <p><strong>Discipline:</strong> {workout.discipline}</p>
            <Button color="blue" variant='outline' onClick={() => onEdit(workout._id)}>Edit</Button> 
            <Button color="orange" variant='outline' onClick={() => onView(workout._id)}>View Details</Button> 
            <Button color="red" variant="outline" onClick={() => onDelete(workout._id)}>Delete</Button> 
        </div>
    );
}

export default WorkoutCard;