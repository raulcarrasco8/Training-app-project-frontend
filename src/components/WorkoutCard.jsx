

function WorkoutCard({workout, onEdit, onView, onDelete}) {

    return (
        <div className="WorkoutCard">
            <h3>{workout.title}</h3>
            <p>{workout.description}</p>
            <p><strong>Discipline:</strong> {workout.discipline}</p>
            <button onClick={() => onEdit(workout._id)}>Edit</button>
            <button onClick={() => onView(workout._id)}>View Details</button>
            <button onClick={() => onDelete(workout._id)}>Delete</button>
        </div>
    );
}

export default WorkoutCard;