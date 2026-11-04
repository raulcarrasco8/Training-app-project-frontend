import { useState } from "react";
import { Button, Group, Select, Stack, TextInput, Textarea } from "@mantine/core";

// Formulario compartido para crear y editar un workout
function WorkoutForm({ initialValues = {}, disciplines, onSubmit, onCancel, submitLabel }) {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [discipline, setDiscipline] = useState(initialValues.discipline ?? null);
  const [description, setDescription] = useState(initialValues.description ?? "");
  const [exercises, setExercises] = useState(initialValues.exercises ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // onSubmit devuelve una promesa; al terminar, quitamos el estado de carga
    Promise.resolve(onSubmit({ title, discipline, description, exercises })).finally(() =>
      setIsSubmitting(false)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Title"
          placeholder="e.g. Track intervals"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          data-autofocus
        />
        <Select
          label="Discipline"
          placeholder="Choose a discipline"
          data={disciplines.map((d) => ({ value: d._id, label: d.name }))}
          value={discipline}
          onChange={setDiscipline}
          searchable
          required
          comboboxProps={{ withinPortal: true }}
        />
        <Textarea
          label="Description"
          placeholder="Goal and context of the session"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autosize
          minRows={2}
          required
        />
        <Textarea
          label="Exercises"
          description="One per line."
          placeholder={"Warm-up 15 min\n10 x 400 m at 5K pace\nCool-down 10 min"}
          value={exercises}
          onChange={(e) => setExercises(e.target.value)}
          autosize
          minRows={4}
          required
        />
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={!discipline}>
            {submitLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default WorkoutForm;
