import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Center, Group, Loader, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const API_URL = import.meta.env.VITE_API_URL;

// Formulario para crear una disciplina (se muestra dentro de un modal)
function AddDiscipline({ onCreated, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Estado de la vista previa: idle (sin URL) | loading | ok | error
  const [imageStatus, setImageStatus] = useState("idle");

  const trimmedUrl = imgUrl.trim();
  const looksLikeUrl = /^https?:\/\/\S+$/.test(trimmedUrl);

  // Cada vez que cambia la URL, volvemos a comprobar si carga como imagen
  useEffect(() => {
    setImageStatus(looksLikeUrl ? "loading" : "idle");
  }, [trimmedUrl, looksLikeUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/api/disciplines`,
        { name, description, imgUrl: trimmedUrl },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        notifications.show({
          title: "Discipline created",
          message: `${name} is ready for your workouts.`,
          color: "lane",
        });
        onCreated?.();
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Couldn't create the discipline",
          message: error.response?.data?.message || "Check the fields and try again.",
          color: "red",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="e.g. Trail running"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          data-autofocus
        />
        <Textarea
          label="Description"
          placeholder="What kind of sessions go here?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autosize
          minRows={2}
          required
        />
        <TextInput
          label="Image URL"
          description="Paste a link to a photo, e.g. from Unsplash."
          placeholder="https://images.unsplash.com/..."
          type="url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          error={
            imageStatus === "error" &&
            "This link doesn't point to an image. Right-click the photo and choose \"Copy image address\"."
          }
          required
        />

        {/* Vista previa: así se ve si la URL es una imagen antes de crear */}
        {looksLikeUrl && imageStatus !== "error" && (
          <Box pos="relative" h={140} bg="gray.1" style={{ borderRadius: "var(--mantine-radius-md)", overflow: "hidden" }}>
            <img
              key={trimmedUrl}
              src={trimmedUrl}
              alt="Image preview"
              onLoad={() => setImageStatus("ok")}
              onError={() => setImageStatus("error")}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: imageStatus === "ok" ? "block" : "none" }}
            />
            {imageStatus === "loading" && (
              <Center h="100%">
                <Loader size="sm" />
              </Center>
            )}
          </Box>
        )}
        {imageStatus === "ok" && (
          <Text size="xs" c="dimmed" mt={-8}>
            Preview of how the photo will be cropped on the card.
          </Text>
        )}
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={imageStatus === "error"}>
            Create discipline
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default AddDiscipline;
